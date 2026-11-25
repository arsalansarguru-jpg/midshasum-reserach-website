# Environment Setup

## Local development

1. Use Node.js 20.9 or newer and npm.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Keep `.env.local` private; `.gitignore` excludes `.env*`.
5. Run `npm run dev`.

## Contact delivery

Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. See `CONTACT_INTEGRATION_GUIDE.md` for provider setup and tests. The production endpoint does not accept submissions for delivery until required variables exist. The client page disables the submit button when service configuration is incomplete.

For local development, email delivery still requires Resend configuration; only the rate limiter has a local in-memory fallback. Never put credentials in `NEXT_PUBLIC_*` variables.

## Vercel

Add credentials through the project's Environment Variables settings for the intended environment. Keep values encrypted and server-only. Add verified sender and destination values only after the account owner approves them. Redeploy after changing variables. Do not deploy or modify DNS as part of this setup without explicit authorization.

The canonical website URL is currently configured in application metadata as `https://midshasumresearch.com`. Verify domain ownership and DNS through the approved hosting/domain accounts before launch.
