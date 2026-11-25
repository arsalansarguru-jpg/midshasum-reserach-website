import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;
const categories = new Set([
  "General institutional enquiry",
  "Research collaboration",
  "Technology partnership",
  "Institutional relationship",
  "Licensing opportunity",
  "Media and editorial enquiry"
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const localRateLimit = new Map<string, { count: number; resetAt: number }>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJsonBody(request: NextRequest): Promise<Record<string, unknown> | null> {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return null;
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  try {
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const value: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return isRecord(value) ? value : null;
  } catch {
    return null;
  }
}

function getClientIp(request: NextRequest): string | null {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  return forwardedIp || (process.env.NODE_ENV !== "production" ? "local-development" : null);
}

async function checkRateLimit(ip: string): Promise<
  | { available: true; allowed: boolean; retryAfter: number }
  | { available: false }
> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    const limiter = new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "midshasum:contact",
      analytics: false
    });
    const identifier = createHash("sha256").update(ip).digest("hex");
    const result = await limiter.limit(identifier);
    return {
      available: true,
      allowed: result.success,
      retryAfter: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))
    };
  }

  if (process.env.NODE_ENV === "production") return { available: false };

  const now = Date.now();
  const entry = localRateLimit.get(ip);
  if (!entry || entry.resetAt <= now) {
    localRateLimit.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return { available: true, allowed: true, retryAfter: 900 };
  }
  if (entry.count >= 5) {
    return {
      available: true,
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
    };
  }
  entry.count += 1;
  return {
    available: true,
    allowed: true,
    retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
  };
}

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { "Cache-Control": "no-store", ...Object.fromEntries(new Headers(headers).entries()) }
    }
  );
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return jsonError("Send the enquiry as JSON.", 415);
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== request.nextUrl.origin) {
        return jsonError("Cross-origin requests are not accepted.", 403);
      }
    } catch {
      return jsonError("Invalid request origin.", 403);
    }
  }

  const body = await readJsonBody(request);
  if (!body) return jsonError("Invalid or oversized request.", 400);

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (honeypot) return jsonError("Unable to submit enquiry.", 400);
  if (name.length < 2 || name.length > MAX_NAME_LENGTH || /[\u0000-\u001f\u007f]/.test(name)) {
    return jsonError("Enter a valid name.", 400);
  }
  if (email.length > MAX_EMAIL_LENGTH || !emailPattern.test(email)) {
    return jsonError("Enter a valid email address.", 400);
  }
  if (!categories.has(category)) return jsonError("Select a valid enquiry category.", 400);
  if (
    message.length < 20 ||
    message.length > MAX_MESSAGE_LENGTH ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(message)
  ) {
    return jsonError("Message must be between 20 and 5000 characters.", 400);
  }

  const ip = getClientIp(request);
  if (!ip) {
    console.error("Contact endpoint is missing a trusted client IP header.");
    return jsonError("The enquiry service is temporarily unavailable.", 503);
  }

  let rateLimit: Awaited<ReturnType<typeof checkRateLimit>>;
  try {
    rateLimit = await checkRateLimit(ip);
  } catch {
    console.error("Contact rate-limit service request failed.");
    return jsonError("The enquiry service is temporarily unavailable.", 503);
  }
  if (!rateLimit.available) {
    return jsonError("The enquiry service is not configured for production.", 503);
  }
  if (!rateLimit.allowed) {
    return jsonError("Too many enquiries. Please try again later.", 429, {
      "Retry-After": String(rateLimit.retryAfter)
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return jsonError("Enquiry delivery is not configured. Please try again later.", 503);
  }
  if (!emailPattern.test(recipient) || !emailPattern.test(sender)) {
    console.error("Contact email configuration contains an invalid address.");
    return jsonError("The enquiry service is temporarily unavailable.", 503);
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Institutional enquiry: ${category}`,
      text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`
    });
    if (error || !data?.id) {
      console.error("Contact email provider did not accept the enquiry.", {
        providerError: error?.name ?? "MissingDeliveryId"
      });
      return jsonError("We could not deliver your enquiry. Please try again later.", 502);
    }
    return NextResponse.json(
      { message: "Thank you. Your enquiry has been delivered." },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Contact email delivery failed.", {
      errorName: error instanceof Error ? error.name : "UnknownError"
    });
    return jsonError("We could not deliver your enquiry. Please try again later.", 502);
  }
}
