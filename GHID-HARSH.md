# Handover Guide for Harsh — A2Z Bridging website

Live preview: https://a2z-bridging.vercel.app · CMS: https://a2z-bridging.vercel.app/admin
(Admin login details are sent separately, not stored in the repository. Change the password after first login.)

---

## 1. What this site is

A Next.js + Payload CMS site (hosted on Vercel, database on Neon Postgres, media on Vercel Blob). It replaces the WordPress site at a2zbridging.co.uk. Everything on it is editable in the CMS except the fixed product pages, the homepage layout and the legal wording (those live in code).

| Area | URL | Edited in |
|---|---|---|
| Homepage, product pages (`/bridging-loans`, `/buy-to-let-mortgages`, `/development-loans`, `/property-auction-finance`, `/commercial-mortgages`, `/business-loans`) | `/` and above | Code (`src/lib/products.ts`, `src/app/(frontend)/page.tsx`) |
| Guides (blog) | `/guides`, `/guides/<slug>` | CMS → Guides |
| Case studies (29 imported from the old site) | `/case-studies`, `/case-studies/<slug>` | CMS → Case Studies |
| Team, testimonials | `/team`, homepage | CMS → Team / Testimonials |
| Ad landing pages | `/lp/bridging-loans`, `/lp/commercial-loans`, `/lp/<slug>` | CMS → Landing Pages (the two main ones are in code) |
| Leads from website forms and the floating contact widget | — | CMS → Leads |
| Privacy Policy / Complaints (text copied from the old site) | `/privacy-policy`, `/complaints` | Code (`src/lib/legal.ts`) |
| Thank-you page (noindex) | `/thank-you` | Code |

Day-to-day CMS instructions: see `GHID-CMS.md`.

---

## 2. Redirects (SEO — nothing to do, just verify)

All old WordPress URLs from the migration spreadsheet are redirected with a single permanent (301/308) hop, with or without a trailing slash. They are defined in `redirects.ts`, for example:

- `/services/bridging-loans/` → `/bridging-loans`
- `/contact-us/` → `/contact`
- `/bridging-loan-northwood/` → `/case-studies/bridging-loan-northwood-7-days`
- `/what-is-a-bridging-loan/` → `/guides/what-is-a-bridging-loan`
- `/category/blog/page/*` → `/case-studies`
- `/feed` → 410 Gone
- `www.a2zbridging.co.uk/*` → `https://a2zbridging.co.uk/*`

Post-launch check: crawl the old sitemap URLs (post/page/category/author sitemaps) and confirm every one ends on a 200 page.

---

## 3. Go-live checklist (what is still needed from your side)

1. **DNS cutover.** Point `a2zbridging.co.uk` (and `www`) at the Vercel project `a2z-bridging`. Add both domains in Vercel → Project → Settings → Domains. Tell the developer when it is done: the `a2z-bridging.vercel.app` → `a2zbridging.co.uk` redirect and `NEXT_PUBLIC_SERVER_URL` must be switched at that point so the sitemap and canonical URLs use the real domain.
2. **reCAPTCHA.** The Zoho forms use a reCAPTCHA key that currently shows "Invalid key type" on other domains. Add `a2z-bridging.vercel.app` and `a2zbridging.co.uk` to that key's allowed domains in the Google reCAPTCHA console (or send a new key).
3. **GA4 / Google Ads / GTM.** Not installed on this build. Add your tags (e.g. in `src/app/(frontend)/layout.tsx` for the main site, `src/app/(landing)/layout.tsx` for the ad landing pages). The conversion event should fire on `/thank-you` and `/lp/thank-you`.
4. **Google Search Console.** Add the property, submit `/sitemap.xml`, and watch Coverage for the first 2–3 weeks.
5. **GitHub → Vercel link** (auto-deploy on push): Vercel → Project → Settings → Git → Connect `B0Gd4n28/a2z-bridging`. Until then deploys are manual (`npx vercel --prod`).
6. **Legal copy.** `/privacy-policy` and `/complaints` are the old site's text. Have A2Z / their compliance adviser review them (the privacy policy predates the Zoho CRM, reCAPTCHA and the contact widget).
7. **Missing assets from the client:** the real NACFB logo (the file supplied earlier was the Korean NongHyup logo) and confirmation that FCA logo use is permitted in promotions.

---

## 4. Static HTML pages for the WordPress ad landings

If the two ad pages must still live on the WordPress server before the DNS cutover, use the files in `static-exports/`:

- `bridging-loans.html` → `/lp/bridging-loans`
- `commercial-loans.html` → `/lp/commercial-loans`
- `thank-you.html` → `/lp/thank-you`

They are self-contained (inline CSS, vanilla JS) and hold the Zoho form, calculator and sticky mobile bar. Re-upload them after any change to the landing pages, otherwise WordPress keeps serving the older version. After the DNS cutover the Next.js versions at the same URLs take over automatically.

---

## 5. Forms and leads

| Form | Where it posts | Where you see it |
|---|---|---|
| Ad landing pages (`/lp/*`) | Zoho Web-to-Lead (two forms, each with its own tokens) | Zoho CRM |
| `/quote`, `/calculator`, `/contact` | `/api/leads` | CMS → Leads |
| Floating "Contact us" widget (all main-site pages) | `/api/leads`, source `widget:<page>` | CMS → Leads |

All have a hidden honeypot field and a minimum time-on-page check. The CMS has no email notification yet; if you want one, add an email adapter in `src/payload.config.ts` and a hook on the Leads collection.

---

## 6. Developer reference

```bash
npm install
npm run dev              # http://localhost:3000 (local SQLite database a2z-bridging.db)
npm run build            # production build + sitemap
npm run generate:types   # after changing any collection
npx tsc --noEmit         # type-check
```

- **Environment variables (Vercel, Production):** `DATABASE_URL` (Neon), `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SERVER_URL`, `CRON_SECRET`, `PREVIEW_SECRET`.
- **Database schema changes do not apply automatically in production.** After editing a collection, run a script once against the Neon database in dev mode, for example: set `DATABASE_URL` (Neon) and `PAYLOAD_SECRET`, then `npx tsx scripts/push-schema.ts`.
- **Useful scripts** (`scripts/`): `create-admin.ts` (create or reset an admin user, needs `ADMIN_EMAIL` and `ADMIN_PASSWORD`), `import-case-studies.ts` (re-import case studies from `scripts/data/case-studies.json`), `scrape-case-studies.cjs` (re-scrape the old site), `seed.ts`.
- Scripts run with `npx tsx` do not read `.env`; pass variables explicitly. Stop the dev server before running a script against the local SQLite file.
- **Deploy:** `npx vercel --prod --yes --scope proaimobil2025-clouds-projects`.
- **Admin import map:** after adding/removing admin components or storage plugins run `npx payload generate:importmap` and commit `src/app/(payload)/admin/importMap.js` (a stale import map causes a blank admin page).

---

## 7. Quick post-launch test list

- [ ] `https://a2zbridging.co.uk/` loads over HTTPS; `www.` redirects to the apex domain
- [ ] 10 random old URLs redirect to the right new page
- [ ] `/admin` login works; a test guide can be created, published and appears on `/guides`
- [ ] Submit each form (landing pages → Zoho; `/quote` and the widget → CMS Leads) and delete the test entries
- [ ] `/thank-you` and `/lp/thank-you` are noindex and fire the conversion tag
- [ ] `/sitemap.xml` and `/robots.txt` show the real domain (not vercel.app or localhost)
- [ ] reCAPTCHA renders on both landing-page forms
