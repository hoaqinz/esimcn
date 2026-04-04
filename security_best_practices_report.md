# Security Review Report

Date: 2026-03-29
Target: `esimcn.net`
Codebase: `/Users/mac/Downloads/esimcn.net`

## Follow-up Note

Follow-up applied on 2026-04-02:

- Order pages and order JSON APIs now require a per-order access token, so the original "reference-only access" issue is no longer current in this workspace snapshot.
- Direct top-up checkout was disabled because the current provider integration does not safely bind top-up payments to the correct ICCID.
- Payment webhook handling now verifies the receiving account number before marking an order as paid.
- `wrangler.toml` in this workspace snapshot no longer contains `PAYMENT_WEBHOOK_SECRET`; production secrets should stay in Cloudflare Worker secrets.

## Executive Summary

The project is not obviously "already hacked", and `npm audit --omit=dev` reported no known production package CVEs at the time of review. However, the current application has several application-layer weaknesses that can expose customer order data and allow unauthorized state changes.

The most important issues are:

1. At review time, order and eSIM detail pages/APIs were accessible with only the order reference, with no second factor or signed access control.
2. The public payment confirmation endpoint can be triggered without authentication and can alter order state.
3. At review time, a webhook secret was committed in `wrangler.toml`, which is not a safe place for secrets.

These should be treated as priority fixes before considering the deployment "secure enough" for sensitive customer order and eSIM data.

## Critical / High

### SEC-001
- Severity: High
- Location: `src/worker.ts:2148`, `src/worker.ts:2208`, `src/worker.ts:2248`, `src/worker.ts:2299`, `src/worker.ts:2355`, `src/worker.ts:2646`
- Evidence:
  - Order references are only 8 hex characters plus prefix: `const reference = \`ECN-\${crypto.randomUUID().slice(0, 8).toUpperCase()}\`;`
  - Sensitive order views are returned directly from the reference:
    - `/thanh-toan/:reference`
    - `/thanh-toan-thanh-cong/:reference`
    - `/api/orders/:reference/usage`
    - `/api/orders/:reference/topups`
    - `/api/orders/:reference/status`
- Impact: Anyone who learns or guesses a valid reference can access customer order details; for paid orders this can include eSIM QR code, ICCID, activation code, APN, PIN/PUK, usage information, and top-up options.
- Fix:
  - Do not treat the order reference as the only secret.
  - Add a second factor for order access, such as a signed access token, a one-time email login link, or required email + phone re-verification before revealing order details.
  - Increase the entropy of public-facing order access tokens beyond the current short reference.
- Mitigation:
  - Immediately reduce data exposed by the JSON endpoints.
  - Require a per-order secret token for all order pages and APIs.
  - Log and rate-limit repeated misses on order endpoints.
- False positive notes: If a separate edge layer already protects these endpoints, verify it explicitly; no such protection is visible in code or runtime responses.

### SEC-002
- Severity: High
- Location: `src/worker.ts:2695`, `src/worker.ts:2711`, `src/worker.ts:2714`
- Evidence:
  - `app.post('/api/orders/:reference/payment-confirm', async (c) => {`
  - The route performs no authentication, signature verification, or CSRF token validation.
  - It updates state directly: `UPDATE orders SET payment_status = ? WHERE id = ?`
- Impact: Any internet user can hit this public endpoint and move unpaid orders into `pending_review`, tampering with payment workflow and operational state.
- Fix:
  - Remove this endpoint from the public surface, or protect it with admin auth / webhook signature verification.
  - If it is only for internal UX, replace it with a client-side "I have paid" note that does not modify trusted order state.
- Mitigation:
  - Add rate limiting and audit logging immediately if the route must stay live short-term.
- False positive notes: The endpoint does not mark orders as `paid`, so this is an integrity flaw rather than a direct free-purchase bypass.

### SEC-003
- Severity: High
- Location: `src/worker.ts:2383`, `wrangler.toml:14`
- Evidence:
  - Payment webhook auth is only a shared header secret: `x-webhook-secret`
  - The expected secret was committed in repo config at review time.
- Impact: If the repository or config leaks, an attacker can forge payment webhook calls and mark matching orders as paid when they know a valid order reference/payment code and amount.
- Fix:
  - Rotate the webhook secret immediately.
  - Move the secret into Cloudflare Worker secrets, not `[vars]` in `wrangler.toml`.
  - Prefer a signed webhook scheme from the payment source if available.
- Mitigation:
  - Restrict webhook source IPs if the provider supports stable ranges.
  - Log and alert on repeated webhook failures or mismatches.
- False positive notes: This is less severe if the repo is strictly private and never shared, but it still violates basic secret-handling practice.

## Medium

### SEC-004
- Severity: Medium
- Location: `src/worker.ts:1678`, `src/worker.ts:1698`
- Evidence:
  - Admin login compares raw submitted credentials directly to env values.
  - No visible rate limiting, lockout, delay, IP throttling, or bot protection.
  - Default username falls back to `admin`.
- Impact: The public `/admin/login` endpoint is susceptible to password guessing and credential stuffing.
- Fix:
  - Add Cloudflare rate limiting / WAF rules on `/admin/*`.
  - Use a non-default admin username.
  - Add login throttling with exponential backoff or per-IP attempt counters.
- Mitigation:
  - Restrict `/admin/*` by IP or Cloudflare Access.
- False positive notes: A strong password helps, but does not replace rate limiting.

### SEC-005
- Severity: Medium
- Location: `src/worker.ts:950`, `src/worker.ts:1231`
- Evidence:
  - HTML emails interpolate user/order fields directly into HTML, for example `${delivery.fullName}`, `${delivery.planTitle}`, `${payment.fullName}`, `${payment.email}`.
  - Unlike the page renderer in `src/render.ts`, these templates do not use `escapeHtml`.
- Impact: Malicious input can inject markup into outbound emails. Depending on email client behavior, this can enable phishing content, tracking, layout breakage, or unsafe links in emails sent from your domain.
- Fix:
  - Escape all interpolated values before inserting into HTML email templates.
  - Reuse the same `escapeHtml` helper pattern used in `src/render.ts`.
- Mitigation:
  - Validate and constrain user input length/character sets at order creation time.
- False positive notes: Modern email clients often strip scripts, but HTML injection in email is still unsafe.

### SEC-006
- Severity: Medium
- Location: runtime response from `https://esimcn.net/` on 2026-03-29
- Evidence:
  - `curl -I https://esimcn.net/` returned only basic headers and did not include visible `Content-Security-Policy`, `X-Frame-Options`, `frame-ancestors`, or `Strict-Transport-Security`.
- Impact: Missing browser hardening headers increase the blast radius of future XSS, clickjacking, and embedding issues.
- Fix:
  - Add a CSP appropriate for the current asset model.
  - Add `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`.
  - Consider HSTS only after confirming the domain is permanently HTTPS-ready.
- Mitigation:
  - At minimum, set `frame-ancestors 'none'` and a restrictive `default-src`.
- False positive notes: These headers may be set at another edge layer, but they were not present in runtime responses during review.

## Low

### SEC-007
- Severity: Low
- Location: runtime response from `https://esimcn.net/.well-known/security.txt` on 2026-03-29
- Evidence:
  - The path returned the normal 404 HTML page rather than a `security.txt` document.
- Impact: Security researchers have no standard disclosure contact file to follow.
- Fix:
  - Publish a minimal `/.well-known/security.txt` with contact and policy information.
- Mitigation:
  - Ensure the support or abuse contact is easy to find elsewhere until added.
- False positive notes: This is operational hardening, not an exploitable bug.

## What Looked Good

- `npm audit --omit=dev --json` reported no known production dependency vulnerabilities during review.
- SQL queries consistently use bound parameters rather than raw string interpolation.
- User-facing HTML page rendering in `src/render.ts` generally escapes interpolated values with `escapeHtml`.

## Recommended Fix Order

1. Protect all order detail pages and order JSON APIs with a stronger access model.
2. Remove or lock down `/api/orders/:reference/payment-confirm`.
3. Rotate the webhook secret and move it to Worker secrets immediately.
4. Put `/admin/*` behind Cloudflare Access or at least rate limiting/WAF.
5. Escape all dynamic values in HTML email templates.
6. Add browser security headers at the Worker or Cloudflare edge.
