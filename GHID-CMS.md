# CMS User Guide — A2Z Bridging

The admin panel (CMS) controls all of the site's dynamic content: articles (Guides), case studies, the team, testimonials, and leads submitted through forms.

---

## 1. Access

| What | Where |
|---|---|
| **CMS address** | `http://localhost:3000/admin` (local) · `https://a2z-bridging.vercel.app/admin` (live now) · `https://a2zbridging.co.uk/admin` (once the custom domain is connected) |
| **Login** | An administrator account already exists (`admin@a2zbridging.co.uk`). Change its password under *avatar (top right) → Account* after the first login |
| **New users** | Admin → **Admin** group → **Users** → *Create New* |

---

## 2. What's in the panel

The left-hand menu is organised into groups:

### 📝 "Content" group (the site's content)

| Collection | What it does | Where it appears on the site |
|---|---|---|
| **Guides** | Blog articles / guides. Supports drafts, scheduled publishing, live preview, and SEO fields | `/guides` + the first 3 on the homepage |
| **Pages** | Pages built from blocks (hero, content, media, CTA, forms) — for new landing pages without a developer | `/{page-slug}` |
| **Case Studies** | Success stories: challenge → solution → outcome + key figures (amount, LTV, term, days to completion) | `/case-studies` |
| **Team** | Team members: name, role, bio, photo, specialism tags. The **order** field controls display order (lower = first) | `/team` + linked from case studies |
| **Testimonials** | Client reviews. Tick **featured** for the best ones | homepage (carousel) |
| **Media** | All images/files. **Always fill in the alt text** — it matters for SEO | site-wide |
| **Categories** | Categories used to organise guides (e.g. Bridging, Auction) | filters on `/guides` |

### 📞 "CRM" group

| Collection | What it does |
|---|---|
| **Leads** | Every form submitted on the site lands here **automatically** (landing page `/quote`, calculator, contact). See the name, phone, requested amount, product, and originating page (the *source* field). Update **status** as you work the lead: `New → Contacted → Qualified → Won / Lost` |

### ⚙️ "Admin" group

- **Users** — accounts with access to this panel.
- **Redirects** — 301 redirects (e.g. if you change a published article's slug).
- **Forms / Form Submissions** — form builder for pages built with Pages.

---

## 3. How to publish a guide (article) — step by step

1. **Guides** → **Create New**
2. Fill in **Title** — the slug is generated automat
ically
3. Add a **Hero Image** (from Media or upload directly)
4. Write the content in the editor (headings, lists, quotes, images, blocks)
5. **SEO** tab: fill in **Meta Title** (max ~60 characters) and **Meta Description** (max ~155) — the *Auto-generate* button helps
6. (Optional) choose **Categories** and **Authors**
7. **Preview** (the eye icon, top right) — see exactly how the article will look on mobile/tablet/desktop
8. **Publish** — or **Save Draft** to continue later
9. The article appears instantly on `/guides` and on the homepage under "Guides & Insights"

> 💡 **Scheduling**: at Publish you can set a future date — the article publishes itself automatically then.

---

## 4. How to add a case study

1. **Case Studies** → **Create New** (or open an existing one — the 29 studies from the old site are already imported)
2. **Title** describing the outcome (e.g. *"£390,000 Bridging Loan Completed in 7 Days, Northwood"*), then choose a **Category**
3. **Stats**: amount, LTV, term, time to completion — shown as large figures in the page header
4. **Intro** (the lead paragraph) and **Location**
5. **Deal snapshot**: label/value rows (Property Value, Product, Rate…) shown in the side panel
6. **Article sections**: add one per block (e.g. *The Client Scenario*, *What Could Have Gone Wrong*, *The Solution*). Write paragraphs separated by a blank line; put bullet points one per line. Set **Tone** to *Risk* or *Solution* for the coloured boxes
7. **Outcome figures** (value + label cards) and **FAQs** (these also feed Google FAQ rich results)
8. Sidebar: **Meta title / Meta description** (SEO). Optionally link the **Advisor**
9. Save — it appears automatically on `/case-studies` (list refreshes within ~10 minutes)

---

## 5. How to manage leads

1. **Leads** (CRM group) — the list is sorted newest first
2. The columns show at a glance: name, phone, product, amount, status
3. Open a lead → see the full message + **source** (which page it came from — useful to know which campaign is working)
4. After calling the client, update **Status** in the sidebar
5. Leads are **not** visible to site visitors — only logged-in users can see them

---

## 6. SEO tips (important!)

- ✅ **Always** fill in Meta Title + Meta Description on guides and pages
- ✅ Add **alt text** to every image in Media
- ✅ Use a single H1 per article (the title), then H2/H3 within the content
- ✅ The sitemap is generated **automatically** (`/sitemap.xml`) — nothing to do
- ✅ If you change the slug of a published article, create a **Redirect** from the old URL
- ✅ Consistent publishing: 2–4 guides a month have a real impact on Google rankings

---

## 7. Technical commands (for the developer)

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site locally at `http://localhost:3000` |
| `npm run build` | Production build + sitemap |
| `npm run seed` | Populates the CMS with initial content (run once) |
| `npm run generate:types` | Regenerates TypeScript types after collection changes |

---

## 8. FAQ

**I deleted something by mistake — can I recover it?**
Guides and pages have *version history* — open the document → **Versions** tab → restore any previous version.

**Can I edit from my phone?**
Yes, the panel is responsive — it works on any device.

**How do I change the text on the homepage / product pages?**
That content lives in code (for speed and SEO) — ask the developer. Anything in the Content/CRM groups can be edited directly from the CMS.

**Who receives leads by email?**
Currently leads are only visible in the panel. Email notifications are the next step to set up (requires SMTP).
