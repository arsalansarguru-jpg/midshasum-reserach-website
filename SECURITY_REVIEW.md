# Security Review

## Scope and outcome

A read-only security-review agent inspected the baseline contact API, form, client/server boundaries, environment usage, validation, spam controls, headers and dependencies. It reported **no confirmed exploitable vulnerability** in that baseline. This is a focused code review, not a penetration test or provider configuration audit.

The baseline `npm audit` did report one high and one moderate vulnerability through the PostCSS version nested under Next.js. The project now pins a patched compatible PostCSS 8.5.x release via npm overrides; verify the final result with `npm audit`.

## Implemented controls

- Production contact API requires all delivery variables and durable Upstash Redis rate-limit configuration; missing services fail closed.
- Sliding-window cap: five requests per 15 minutes per SHA-256 digest of the requester IP.
- Request body is stream-read with a 12 KB ceiling; name, email, category and message are validated server-side.
- Category allowlist, email syntax/length checks, control-character checks and a honeypot are applied before sending.
- The email is plain text; user-provided content is not interpreted as HTML.
- Same-origin checks are applied when the browser supplies an `Origin` header.
- API responses are `no-store`; provider failures are logged without logging message content, addresses or credentials.
- CSP, frame protection, MIME-sniffing protection, referrer and permissions policies are configured.
- `.env*` files are excluded from Git; provider credentials are only read in server code.

## Deployment conditions and limitations

- Configure production Resend and Upstash credentials before enabling the form.
- Local development uses an in-memory limiter only; it is not durable and is not an acceptable production substitute.
- CSP allows inline scripts/styles for Next.js compatibility. It does not use a nonce-based strict CSP; revisit if the app adds third-party scripts or adopts nonce-based rendering.
- Provider accounts, sender-domain DNS, Redis retention, hosting logs and real production headers were not independently inspected.
- No dynamic secrets are present in tracked files; confirm this again before every push.

## Dependency result

Run `npm audit` after installation. The baseline report described above should be resolved by the PostCSS override. Do not use `npm audit fix --force` as it would require an unnecessary Next.js major upgrade.
