# eSIM CN on Cloudflare

Full-stack Cloudflare Worker for `esimcn.net`, built to sell and capture leads for `eSIM China` plans with strong SEO foundations.

## Stack

- Cloudflare Workers
- Hono router
- D1 for order capture
- Server-rendered HTML with custom CSS

## Local development

```bash
cp .dev.vars.example .dev.vars
npm install
npm run dev
```

Fill `.dev.vars` with local-only credentials before running the worker. Keep `.dev.vars` out of git.

The worker exposes:

- `/` main landing page
- `/plans/:slug` plan landing pages
- `/blog/:slug` SEO content pages
- `/api/plans` JSON plan feed
- `/api/orders` order capture endpoint
- `/sitemap.xml`
- `/robots.txt`

## D1 setup

1. Authenticate Wrangler:

   ```bash
   npx wrangler whoami
   ```

2. Create the database:

   ```bash
   npx wrangler d1 create esimcn-db
   ```

3. Copy the returned `database_id` into `wrangler.toml`.

4. Run migrations:

   ```bash
   npm run db:migrate:local
   npm run db:migrate:remote
   ```

## Secrets and runtime config

Public runtime values can stay in `wrangler.toml` under `[vars]`, for example:

- `SITE_URL`
- `PRIMARY_KEYWORD`
- `DEFAULT_SUPPORT_EMAIL`
- `PAYMENT_BANK_CODE`
- `PAYMENT_ACCOUNT_NUMBER`
- `PAYMENT_ACCOUNT_NAME`
- `PAYMENT_NOTIFY_FROM`
- `PAYMENT_NOTIFY_REPLY_TO`

Sensitive values should not be committed to `wrangler.toml`. Set them as Worker secrets instead:

```bash
wrangler secret put PAYMENT_WEBHOOK_SECRET
wrangler secret put PAYMENT_FORWARD_NTA_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put ESIM_ACCESS_CODE
wrangler secret put ESIM_ACCESS_SECRET
wrangler secret put ADMIN_PASSWORD
```

Operational-only values such as `PAYMENT_NOTIFY_BCC` are better stored as secrets too, even if they are not cryptographic secrets:

```bash
wrangler secret put PAYMENT_NOTIFY_BCC
```

If you want a non-default admin username, set `ADMIN_USERNAME` in `.dev.vars` locally and in Cloudflare runtime config for production.

## Single webhook for multiple sites

If your bank API only supports one webhook URL, keep the bank pointed at this Worker:

- `https://esimcn-net.sonhangtravel.workers.dev/api/payment-webhook`

This project now supports forwarding `NTA / ESIMNTA` payments to a second site.

Required runtime config for web2 forwarding:

- `PAYMENT_FORWARD_NTA_URL`
- `PAYMENT_FORWARD_NTA_SECRET`

Recommended code prefixes:

- `esimcn`: `ECN-XXXXXXXX` and `ESIMCN########`
- `web2`: `NTA-XXXXXXXX` and `ESIMNTA########`

The receiver kit for web2 lives in:

- `output/web2-payment-webhook-kit`

## Deploy to Cloudflare

```bash
npm run deploy
```

Then in Cloudflare:

1. Add the `esimcn.net` zone to the same Cloudflare account if it is not already there.
2. Add the custom domain or route for the apex domain and `www`.
3. Verify `https://esimcn.net/sitemap.xml` is reachable.
4. Submit the sitemap in Search Console.

At the moment the repo deploys cleanly to `workers.dev`. If you want custom-domain routing to be fully codified in git, add the production `routes` or `custom_domain` entries to `wrangler.toml` after confirming the exact zone and route pattern in the target Cloudflare account.

## SEO notes

- The site is optimized for the target keyword `esim china`.
- It includes exact-match and long-tail supporting pages, JSON-LD, canonical tags, internal links, robots, and sitemap generation.
- Ranking first is never guaranteed. The file `SEO-ROADMAP.md` explains what to do after launch.
