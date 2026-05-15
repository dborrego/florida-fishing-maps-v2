# Florida Fishing Maps

E-commerce site for selling GPS fishing spot maps for marine chartplotters.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Stripe Checkout · Resend (email) · Vercel Blob (file storage)

## Quick start

```bash
cp .env.example .env.local
# fill in real Stripe + Resend + Blob keys
npm install
npm run dev
```

## Adding / changing products

Edit `src/lib/products.ts`. Sitemap, JSON-LD, llms.txt, and the shop pages all derive from this file.

## Uploading the actual map files

Naming convention inside `map-files/`:

```
map-files/florida-keys/florida-keys-garmin.gpx
map-files/florida-keys/florida-keys-lowrance.usr
map-files/florida-keys/florida-keys-google-earth.kmz
```

Then:

```bash
export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx
node scripts/upload-maps.mjs
```

The download API resolves the right Blob URL automatically.

## Stripe webhook (for local dev)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the whsec_… into STRIPE_WEBHOOK_SECRET
```

## Deploy

Push to GitHub → import to Vercel → set env vars → point GoDaddy DNS at Vercel.
See `DEPLOY.md` for the full walkthrough.

## SEO / GEO / AEO

- Server-rendered everywhere
- JSON-LD: Organization, WebSite, Product (with offer), BreadcrumbList, FAQPage, Service+GeoCoordinates
- Sitemap at `/sitemap.xml`, robots at `/robots.txt`
- Dynamic OG image at `/opengraph-image`
- AI-friendly summary at `/llms.txt`
- AEO crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) explicitly allowed
