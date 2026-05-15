# Deploy Guide — floridafishingmaps.com

End-to-end checklist. Follow top to bottom. Estimated time: 45 minutes.

---

## 1. Initialize git

```bash
cd "Florida Fishing Maps"
git init
git add .
git commit -m "Initial commit: Florida Fishing Maps storefront"
git branch -M main
```

## 2. Create the GitHub repo

1. Go to https://github.com/new
2. Repo name: `florida-fishing-maps`
3. **Private** (until you're ready to open-source)
4. Do NOT add a README, .gitignore, or license (we already have them)
5. Create repository
6. Copy the SSH or HTTPS URL it shows you

```bash
git remote add origin git@github.com:YOUR_USERNAME/florida-fishing-maps.git
git push -u origin main
```

## 3. Create Stripe account & grab keys

1. https://dashboard.stripe.com/register (or log in)
2. Activate your account: business name "Florida Fishing Maps", payout bank, tax info
3. **Switch to Test mode** in the top-right toggle
4. Developers → API keys → copy:
   - `Publishable key` → `pk_test_…`
   - `Secret key` → `sk_test_…`
5. Save both somewhere safe — you'll paste them into Vercel in Step 6.

## 4. Create Resend account (transactional email)

1. https://resend.com/signup
2. Add and verify your domain `floridafishingmaps.com`:
   - Domains → Add Domain → `floridafishingmaps.com`
   - Resend gives you 4 DNS records (MX, TXT/SPF, TXT/DKIM, TXT/DMARC)
   - Add them in GoDaddy DNS (we do that in Step 7)
3. API Keys → Create API key → "production" → copy `re_…`

## 5. Deploy to Vercel

1. https://vercel.com/new
2. Sign in with GitHub → Import the `florida-fishing-maps` repo
3. Framework: **Next.js** (auto-detected)
4. **Skip env vars for now**, hit Deploy. The first deploy will give you a `.vercel.app` URL.
5. Once deployed: Settings → Storage → Create → **Blob** → "production-maps"
   - Vercel gives you a `BLOB_READ_WRITE_TOKEN` — copy it.

## 6. Configure environment variables in Vercel

Settings → Environment Variables. Add each (Production, Preview, Development):

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://floridafishingmaps.com` |
| `NEXT_PUBLIC_SITE_NAME` | `Florida Fishing Maps` |
| `STRIPE_SECRET_KEY` | `sk_live_…` (or `sk_test_…` for now) |
| `STRIPE_WEBHOOK_SECRET` | (filled in step 8) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_…` |
| `RESEND_API_KEY` | `re_…` |
| `ORDER_FROM_EMAIL` | `Florida Fishing Maps <orders@floridafishingmaps.com>` |
| `ORDER_REPLY_TO` | `support@floridafishingmaps.com` |
| `ADMIN_NOTIFY_EMAIL` | `borregod@gmail.com` |
| `BLOB_READ_WRITE_TOKEN` | (from step 5) |
| `DOWNLOAD_SIGNING_SECRET` | run `openssl rand -hex 32` and paste output |
| `DOWNLOAD_TOKEN_TTL_HOURS` | `168` |

After saving: Deployments → click the latest → ⋯ → Redeploy.

## 7. Point GoDaddy DNS at Vercel

1. In Vercel: Settings → Domains → Add → `floridafishingmaps.com`
2. Vercel gives you DNS records. Two ways to set this up:
   - **Easiest:** change your nameservers in GoDaddy to Vercel's (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`). Vercel manages everything.
   - **Keep GoDaddy DNS:** add the records Vercel shows (`A 76.76.21.21` for apex, `CNAME cname.vercel-dns.com` for www).
3. **Also add these in the same DNS zone (for Resend):**
   - The 4 records Resend showed you in Step 4 (SPF, DKIM, DMARC, MX)
4. Wait 5-15 minutes. Vercel will auto-issue an SSL cert.

## 8. Stripe webhook

1. https://dashboard.stripe.com/webhooks → Add endpoint
2. Endpoint URL: `https://floridafishingmaps.com/api/stripe/webhook`
3. Listen to: `checkout.session.completed`
4. Copy the **Signing secret** → `whsec_…`
5. Paste into Vercel env var `STRIPE_WEBHOOK_SECRET` → Redeploy.

## 9. Upload your map files

In your project folder:

```bash
mkdir -p map-files
# Drop your files using the naming convention:
#   map-files/florida-keys/florida-keys-garmin.gpx
#   map-files/florida-keys/florida-keys-lowrance.usr
#   map-files/florida-keys/florida-keys-google-earth.kmz
#   ...one file per (region, format) combo

export BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx_paste_from_vercel
node scripts/upload-maps.mjs
```

## 10. Test with a real $0.50 transaction

1. Visit https://floridafishingmaps.com
2. Pick a region → pick your chartplotter → Buy
3. In Stripe Test mode, use card `4242 4242 4242 4242` exp `12/34` cvc `123`
4. Complete checkout → land on `/success`
5. Email arrives at the address you used → click download → file downloads
6. If working: switch Stripe to **Live mode**, swap keys in Vercel, do one real $1 transaction (then refund yourself).

## 11. Submit to Google + AI search engines

- **Google Search Console:** https://search.google.com/search-console → Add property → verify via DNS TXT → submit `https://floridafishingmaps.com/sitemap.xml`
- **Bing Webmaster Tools:** https://www.bing.com/webmasters
- **IndexNow** (instant indexing): Vercel handles this automatically with the right header.

That's it. You're live.
