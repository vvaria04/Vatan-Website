# Vatan Website — Before vs. After Report
**Old site:** vatanny.com (WordPress) — audited 22 Jun 2026
**New site:** vatan-website.vercel.app (rebuild) — audited 1 Jul 2026

---

## 1. The Headline Numbers

| Tool / Score | Old Site | New Site | Change |
|---|---|---|---|
| **PSI Desktop — Performance** | 72 | **100** | +28 |
| **PSI Desktop — Accessibility** | 85 | **98** | +13 |
| **PSI Desktop — Best Practices** | 81 | **100** | +19 |
| **PSI Desktop — SEO** | 61 | **100** | +39 |
| **PSI Desktop — Agentic Browsing** | 1/2 | **2/2** | ✅ |
| **PSI Mobile — Performance** | 56 | **91** | +35 |
| **PSI Mobile — Accessibility** | 84 | **98** | +14 |
| **PSI Mobile — Best Practices** | 81 | **100** | +19 |
| **PSI Mobile — SEO** | 61 | **100** | +39 |
| **PSI Mobile — Agentic Browsing** | 0/2 | **2/2** | ✅ |
| **Backlinko Overall SEO Score** | 59/100 | **84/100** | +25 |
| **Backlinko Critical Issues** | 7 | **2** | ‑5 |
| **Backlinko Warnings** | 4 | **3** | ‑1 |
| **Backlinko Passed Checks** | 11 | **17** | +6 |

Every single score category improved. Performance and SEO saw the biggest jumps.

---

## 2. Core Web Vitals — Desktop

| Metric | Old | New | Verdict |
|---|---|---|---|
| First Contentful Paint | 0.8 s | 0.7 s | Slight improvement (already fine) |
| Largest Contentful Paint | 3.3 s 🔴 | **0.7 s** 🟢 | Fixed — was the #1 problem |
| Total Blocking Time | 30 ms | 0 ms | Fixed |
| Cumulative Layout Shift | 0.04 | 0.001 | Fixed |
| Speed Index | 3.9 s | 0.7 s | Fixed |

## 3. Core Web Vitals — Mobile (this is what most "restaurant near me" searchers actually use)

| Metric | Old | New | Verdict |
|---|---|---|---|
| First Contentful Paint | 3.4 s 🔴 | 2.6 s 🟡 | Better, still room to improve |
| Largest Contentful Paint | 9.1 s 🔴🔴 | **2.6 s** 🟢 | Massive fix — 9.1s was failing badly |
| Total Blocking Time | 50 ms | 0 ms | Fixed |
| Cumulative Layout Shift | 0.145 🔴 | 0 🟢 | Fixed |
| Speed Index | 7.2 s 🔴 | 4.3 s 🟡 | Better, still the weakest metric |

A 9.1-second LCP on mobile means visitors were staring at a mostly blank/partial screen for nearly 10 seconds — that alone was likely costing bookings and search rankings, since Core Web Vitals directly influence Google's mobile ranking.

---

## 4. What Was Bad on the Old Site (and Fixed)

| Issue | Old Site | New Site |
|---|---|---|
| **Blocked from indexing (noindex tag)** | ❌ Present — site literally could not appear in Google search results | ✅ Removed — page is now indexable |
| **No XML sitemap** | ❌ Missing | ✅ Present (`/sitemap.xml`) |
| **No H1 tag** | ❌ Missing entirely | ✅ Single, well-formed H1 (54 chars) |
| **Broken heading structure** | ❌ H1–H3 didn't exist in the hierarchy | ✅ Proper H1→H2→H3 structure |
| **Meta description** | ❌ Missing entirely | ✅ Present (currently a bit long — see To-Do) |
| **Meta title** | ⚠️ Cut off / broken: *"Vatan Indian Vegetarian \|"* (25 chars) | ✅ Full title, though slightly long (64 chars) |
| **Image alt text** | ⚠️ 1 image missing alt text | ✅ All images have alt text |
| **Open Graph tags** | ❌ Missing title, description, image | ✅ All present, renders a proper social preview card |
| **Twitter/X card** | ❌ Missing title, description, image | ✅ All present |
| **Local business schema** | ❌ None detected | ✅ `IndianRestaurant` schema with name, address, geo-coordinates, hours |
| **Map/geo signals** | ❌ Not detected | ✅ Detected (40.74233, -73.98018) |
| **Contact details on page** | ❌ Not detected | ✅ Address & hours detected |
| **Landmark regions (a11y)** | ❌ No `<main>` landmark | ✅ main / header / footer / nav all present |
| **Link names** | ❌ Missing/generic (bad for screen readers & AI agents) | ✅ Descriptive |
| **Mobile zoom disabled** | ⚠️ `user-scalable=0` — blocks pinch-zoom, an accessibility violation | ✅ Removed, viewport now scalable |
| **Enormous network payload** | 🔴 ~3.4 MB | 🟢 Dramatically reduced (implied by 0.7s LCP) |
| **Unused CSS/JS** | 🔴 188 KiB CSS + 112 KiB JS wasted | 🟢 Resolved |
| **Deprecated APIs** | ⚠️ 1 warning | ✅ Clean |
| **CMS** | WordPress (heavier, more render-blocking scripts/plugins) | Custom/static build via Vercel (no CMS fingerprint detected) |

---

## 5. What's Still Not Perfect on the New Site

| Issue | Detail | Priority |
|---|---|---|
| **"Not using HTTPS" flag** | Backlinko flags this even though the URL is `https://...`. Likely a scanner quirk, a redirect, or a stray `http://` resource on the page — but worth manually checking (SSL cert, mixed content, any hardcoded `http://` links). | 🔴 Verify ASAP |
| **Meta description too long** | 202 characters (target: 140–160) | 🟡 Easy fix |
| **Meta title slightly long** | 64 characters (target: 50–60) | 🟡 Easy fix |
| **Canonical tag mismatch** | Points to `https://vatanny.com/`, not the vercel.app URL itself. This is *correct* if vatanny.com is the intended final production domain — but confirm this is intentional before launch, not an oversight. | 🟡 Confirm intent |
| **Mobile performance still the weak spot** | 88–91/100, LCP 2.6s / Speed Index 4.3s. Render-blocking requests are the biggest remaining opportunity (est. 1.7–1.8s in savings). | 🟡 Optimize further |
| **Heading order** | "Heading elements are not in a sequentially-descending order" still flagged in both mobile & desktop accessibility audits | 🟡 Fix heading levels |
| **Skip link missing** | No "skip to content" link for keyboard users | 🟢 Nice-to-have |
| **Phone number missing** | Local schema shows "Phone: Not available" | 🟡 Add for local SEO/NAP consistency |
| **Font-size / tap-target audits** | Backlinko couldn't return data — re-run to confirm mobile readability/tap targets are fine | 🟢 Re-check |

---

## 6. Local SEO Impact — Why This Matters Most

This is the single biggest story in these reports:

**Before:** The old site had a `noindex` directive. That means, regardless of anything else, **Google could not list vatanny.com in search results at all.** Combine that with zero local business schema, no detected address/phone/hours on-page, and a 9.1-second mobile LCP, and the site was essentially invisible and unusable for "Indian restaurant near me" style searches — which is how most restaurant discovery happens today.

**After:** The new build fixes the entire chain:
- **Indexable again** — the noindex block is removed, so Google can crawl and rank it.
- **Sitemap present** — Google can discover and crawl all pages efficiently.
- **Structured local business data (`IndianRestaurant` schema)** with address, geo-coordinates, and hours — this is what feeds Google's local ranking signals, map pack eligibility, and rich results.
- **Fast load times** — Core Web Vitals are a confirmed Google ranking factor, and mobile LCP went from a failing 9.1s to a passing 2.6s.
- **Social preview cards (OG/Twitter)** — improves click-through when links are shared, which indirectly supports engagement signals.

Net effect: the old site had almost no technical ability to rank locally. The new site now has the right technical foundation to actually compete for local search visibility — the remaining work (meta tag lengths, phone number, HTTPS flag) is fine-tuning, not foundational repair.

One thing to actively protect: the old vatanny.com domain currently has a Domain Authority of 18, 345 referring domains, and real backlinks (Food Network, a Substack food blog, a CUNY Hunter page). **When you cut over to the new site, make sure this authority isn't lost** — either by launching the new build on the same vatanny.com domain with proper redirects, or by 301-redirecting the old domain to the new one if the domain changes. Losing that link equity would undercut a lot of the technical gains you just made.

---

## 7. Priority Action List (What To Do Now)

1. **Investigate the "not using HTTPS" flag** — confirm no mixed content or stray HTTP resources.
2. **Trim meta title** to 50–60 characters, **meta description** to 140–160 characters.
3. **Decide and confirm the canonical/production domain** — if vatanny.com is where this new build will ultimately live, make sure the domain cutover preserves the existing backlinks and authority (301 redirects, no orphaned links).
4. **Add a phone number** to the local business schema.
5. **Fix heading hierarchy order** flagged in both mobile and desktop accessibility audits.
6. **Shave further mobile render-blocking time** — still the biggest opportunity left (~1.7s of potential savings).
7. **Add a skip-to-content link** for keyboard accessibility.
8. **Re-run the audit** after these fixes to confirm font-size/tap-target checks pass and to catch anything new.

---

## 8. Conclusion

This wasn't a minor tune-up — it was a full technical turnaround. The old site was fast enough on desktop but functionally broken for SEO purposes (blocked from indexing, no meta description, no H1, no local schema) and badly underperforming on mobile (9.1s LCP, near-failing scores across every category). The new build fixes essentially every structural problem: it's indexable, has proper on-page SEO fundamentals, real local business schema, working social previews, and dramatically better speed on both desktop (72→100) and mobile (56→91).

The remaining issues are all small, fast fixes (title/description length, phone number, HTTPS verification) rather than structural rebuilds. The most important non-technical next step is making sure the domain migration doesn't strand the backlink authority already built up on vatanny.com.