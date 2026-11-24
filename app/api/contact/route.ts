import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (honeypot) return NextResponse.json({ error: "Unable to submit enquiry." }, { status: 400 });
  if (name.length < 2 || name.length > 100) return NextResponse.json({ error: "Enter a valid name." }, { status: 400 });
  if (email.length > 254 || !emailPattern.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!category) return NextResponse.json({ error: "Select an enquiry category." }, { status: 400 });
  if (message.length < 20 || message.length > 5000) return NextResponse.json({ error: "Message must be between 20 and 5000 characters." }, { status: 400 });

  if (!process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json(
      { error: "Enquiries are not yet connected to an institutional inbox. Please try again after the contact integration is configured." },
      { status: 503 }
    );
  }

  // Delivery provider intentionally not configured. A provider adapter can be
  // implemented here without exposing credentials in the browser.
  return NextResponse.json(
    { message: "Your enquiry was validated, but automatic delivery is not configured." },
    { status: 503 }
  );
}
