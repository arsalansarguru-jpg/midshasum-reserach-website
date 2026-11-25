# Contact Integration Guide

## Services required for production delivery

1. A Resend account and API key.
2. A sender domain verified by Resend.
3. An approved sender email address on that verified domain.
4. An approved recipient mailbox.
5. An Upstash Redis database with REST access for durable rate limiting.

The repository does not contain credentials or a verified email/domain. Do not publish or enable production delivery until the account owners configure these items.

## Environment variables

Configure these as server-side environment variables in `.env.local` for local work and in the hosting project's protected environment settings for production:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Server-only API credential used by the Resend SDK |
| `CONTACT_TO_EMAIL` | Approved institutional inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Sender address on the domain verified with Resend |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Server-only Upstash REST token |

Use `.env.example` as the blank template. Never use `NEXT_PUBLIC_` for a credential. Never commit `.env`, `.env.local` or provider tokens.

## Resend sender-domain verification

1. Sign in to the institution's Resend account and add the domain authorized for sending.
2. Use the exact DNS records and values Resend presents for the account. They are account-specific; this project intentionally does not invent or prescribe record values.
3. Add those records at the authorized DNS provider only after approval.
4. Wait for Resend to report the domain as verified.
5. Set `CONTACT_FROM_EMAIL` to an address on that verified domain. Set `CONTACT_TO_EMAIL` to the approved receiving mailbox.
6. Keep the API key restricted to the required sending capability where the provider supports scoped keys.

## Upstash rate-limit setup

1. Create a Redis database in the approved Upstash account/region.
2. Copy its REST URL and REST token from the Upstash console into the server-side variables above.
3. The application allows five contact attempts per requester IP digest per 15 minutes using a sliding window. Only a SHA-256 digest is used as the rate-limit identifier.
4. Production fails closed if Upstash is missing or unavailable. Local development uses a process-local fallback; it is not durable and must not be used as production abuse protection.

## Local test

1. Copy `.env.example` to `.env.local` and provide real test credentials only in the local ignored file.
2. Run `npm run dev`.
3. Submit the Contact form with valid fields; the success message appears only after Resend returns a delivery ID.
4. Check Resend's event log and the destination inbox.
5. Try invalid email, missing fields, an invalid category, oversized content and the hidden `website` field. These must not be delivered.
6. Send six attempts from the same IP in the 15-minute window; the sixth must return HTTP 429 with `Retry-After`.
7. Remove provider settings and confirm delivery is disabled with an honest HTTP 503 message.

## API behavior

`POST /api/contact` accepts JSON fields `name`, `email`, `category`, `message` and the honeypot `website`.

- `200`: Resend accepted the message and returned a delivery ID.
- `400`: malformed/oversized JSON or field/honeypot validation failed.
- `403`: supplied Origin does not match the request host.
- `415`: request is not JSON.
- `429`: rate limit reached.
- `502`: provider rejected or failed to deliver.
- `503`: production limiter/provider is unavailable or not configured.

Do not treat validation as delivery. Do not show a success state for any non-2xx response.
