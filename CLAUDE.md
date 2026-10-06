# CLAUDE.md — Portfolio Redesign Brief (Resume-Nextjs template)

Read this file completely before making any change. It overrides your default styling habits and the template's existing patterns.

## 1. What this project is

A personal portfolio for a senior professional who has spent their career in international development and humanitarian work (organizations such as USAID and Catholic Relief Services). The audience is boards, foundations, NGOs, government agencies and recruiters for senior roles.

The site must feel **established, serious and authored**. A visitor should sense institutional credibility within three seconds, before reading a word.

**Starting point:** the ThemeWagon "Resume" Next.js template.

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4: design tokens live in `src/app/globals.css` inside `@theme`. There is no `tailwind.config` file. Do not create one.
- Hosting: **Vercel**, connected to the GitHub repository, on the owner's custom domain. The template's GitHub Pages workflow (`.github/`) has already been deleted; do not recreate it
- Content in `public/data/page-data.json` and `public/data/work-data.json`, plus hard-coded arrays inside components
- Package manager: **npm only.** Never use pnpm or yarn. Never create another lockfile.

We **keep the template's color palette** (adjusted for accessibility below) and **replace its typography, layout behavior and decorative layer**.

## 2. Guiding principle

**This website should look like a publication, not a template.**

A template is assembled from generic modules designed to fit anyone. A publication is composed around one person's work, with every element placed by editorial decision. The visual reference is the world this person comes from: annual reports, evaluation reports, field publications, policy briefs. Not a designer's portfolio, not a startup landing page.

When in doubt, choose the option that removes something.

## 3. The five principles

1. **Typography carries the identity.** Heavy, confident headlines and dark, highly readable body text. The type does the branding, so the page needs no icons, illustrations or decorative effects.
2. **Visible precision.** One grid, one hard left edge, exact alignment, square geometry. Nothing floats, nothing overlaps.
3. **Authentic imagery, one treatment.** Real field and professional photographs, presented as plain rectangles with captions.
4. **Color as structure.** The orange is used for a few deliberate structural moments, not sprinkled across the page.
5. **Editorial hierarchy.** Every section has one lead element. Supporting material is visibly secondary.

## 4. Color

The template palette, mapped to roles. Contrast ratios are measured against white.

| Template value | New token | Role | Notes |
|---|---|---|---|
| `#000000` (`text-black`) | `--color-ink` | All headings, body text, heavy rules | Use `#000000`. Do not substitute a tinted near-black |
| `#FFFFFF` | `--color-paper` | Page background | One background for the whole site |
| `#FE4300` (`primary`) | `--color-signal` | Heavy structural rules, the one color band, large display text only | 3.49:1 on white. Allowed for large text (24px+ bold) and non-text elements. **Never** for body text, small labels or links |
| new: `#C23400` | `--color-signal-text` | Small orange text: links, focus outline | 5.55:1 on white. Darker shade of the same orange, passes AA |
| `#F0F0F0` (`softGray`) | `--color-field` | At most one quiet background band | Not as alternating section stripes |
| `#D7DCDD` (`mistGray`) | `--color-rule` | Thin rules between list items | |
| `#868686` (`secondary`) | replace with `#5C5C5C` as `--color-muted` | Captions and metadata only | The original fails AA (3.64:1). Never used for body paragraphs |
| `#C0D8E0` (`gray`) | remove | | Only used for skill-rating dots and input borders, both of which are being removed |
| Tailwind `orange-500` (used in section numbers) | remove | | Inconsistent second orange. Use the tokens above only |

Implementation in `globals.css`:

```css
@theme {
  --color-ink: #000000;
  --color-paper: #FFFFFF;
  --color-signal: #FE4300;
  --color-signal-text: #C23400;
  --color-field: #F0F0F0;
  --color-rule: #D7DCDD;
  --color-muted: #5C5C5C;
  --breakpoint-xs: 425px;
}
```

Remove `--color-primary`, `--color-secondary`, `--color-softGray`, `--color-mistGray` and `--color-gray` once every usage is migrated. Search the whole `src` folder for `primary`, `secondary`, `softGray`, `mistGray`, `gray`, `orange-` and hex values like `#FE4300` written directly in SVGs and components.

Color rules:

- **Orange is structure.** Its permitted uses: (1) the heavy rule at the top of each major section, (2) one full-width band for a quote or statement, (3) link and focus color via `--color-signal-text`. Nothing else.
- In the orange band, text is **black on orange** (6.02:1), not white on orange (3.49:1).
- No gradients, no tints, no `bg-primary/15` style overlays, no `backdrop-blur`.
- No alternating gray and white section backgrounds. Sections are separated by rules and space.
- Remove the dark-mode variant (`@custom-variant dark`) and the unused `next-themes` dependency unless instructed otherwise.

## 5. Typography

### Typefaces

Replace **Bricolage Grotesque** entirely.

| Role | Typeface | Weights |
|---|---|---|
| Headlines, name, section titles, labels, navigation | **Public Sans** | 600, 700, 800 |
| Body text, profile, project descriptions, captions | **Source Serif 4** | 400, 400 italic, 600 |

Public Sans is the typeface of the US government's design system: plain, sturdy and native to this person's professional world. Source Serif 4 reads like a well-set report.

Load both with `next/font/google` in `src/app/layout.tsx`, exposed as CSS variables:

```tsx
import { Public_Sans, Source_Serif_4 } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});
```

Apply both variables on `<html>`, then map them in `@theme`:

```css
@theme {
  --font-sans: var(--font-public-sans), "Helvetica Neue", Arial, sans-serif;
  --font-serif: var(--font-source-serif), Georgia, "Times New Roman", serif;
}
```

The `body` default is the serif (`font-serif`). Headings and labels use `font-sans`. Note that the template currently misnames its font variable as `--font-geist-sans`; delete it.

### Type scale

Replace the template's `@layer base` heading sizes with this scale. Do not use sizes outside it.

| Element | Use | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Name in hero | `clamp(3rem, 7.5vw, 7rem)` | 800 sans | 0.95 | -0.025em |
| `h1` | Page title (only one per page, the name) | same as Display | | | |
| `h2` | Section titles | `clamp(2rem, 3.5vw, 3.25rem)` | 800 sans | 1.0 | -0.015em |
| `h3` | Item titles (roles, projects) | `clamp(1.25rem, 1.8vw, 1.625rem)` | 700 sans | 1.15 | -0.005em |
| Lead | Intro statement, profile first paragraph | `clamp(1.25rem, 1.7vw, 1.5rem)` | 400 serif | 1.45 | 0 |
| Body | Paragraphs | `1.125rem` | 400 serif | 1.65 | 0 |
| Small | Captions, metadata | `0.9375rem` | 400 serif | 1.45 | 0 |
| Label | Section labels, nav, table headers | `0.875rem` | 600 sans | 1.3 | 0.01em |

Typography rules:

- Headlines are **heavy and tight**. The template's `font-semibold` (600) headlines are the main reason it feels light. Every `h1` and `h2` becomes 800.
- `p` defaults to `--color-ink`, not gray. Delete the `p { @apply text-base text-secondary; }` base rule.
- Body text blocks have a max width of about `38rem`. Lead text about `46rem`.
- Everything is **flush left, ragged right**. Remove centering (`text-center`, `items-center` on text columns, `justify-center` on text groups).
- Labels are sentence case. No `uppercase`, no wide tracking.
- Do not highlight a single word in a headline with color, italics or weight.
- Years and numbers use `tabular-nums`.

## 6. Layout and grid

- Keep the template's `.container` (max width 80rem) as the outer frame. Inside it, use a 12-column CSS grid for every section.
- **Section pattern used everywhere:** a heavy top rule, then the section title in columns 1–4 and the content in columns 6–12 on desktop. On mobile, both stack in one column on the same left edge.

```
████████████████████████████████████████████████████████████  ← 4px rule, --color-signal
Career                       2014–2021  Catholic Relief Services
                                        Country Representative, Ethiopia
                             ─────────────────────────────────────  ← 1px --color-rule
                             2008–2014  USAID
                                        Senior Program Officer, Kenya
```

- The template currently draws a black `border-b` *under* each `h2`. Replace it with a 4px `--color-signal` `border-t` *above* the section, with the title directly beneath. Rule weights mean something: the heavy orange rule separates sections, thin gray rules separate items.
- Vertical rhythm: use one spacing scale (Tailwind steps 2, 4, 6, 8, 12, 16, 24, 32). Sections are separated by `py-24` to `py-32` on desktop.

## 7. Section-by-section mapping

Work through these files in this order.

### `src/app/layout.tsx`
New fonts as above. Real metadata: title "[Full Name] — [Professional title]", a one-sentence description, Open Graph tags. Remove "Generated by Getnextjs Templates".

### `components/layout/header/index.tsx`
- Replace the orange circle logo with the person's name as a text wordmark (Public Sans 700).
- **Remove the "Download PDF Resume" button** and its `handleDownloadPDF` / `window.print()` code. The website is the CV. A PDF copy is available on request instead (see Contact).
- Navigation: plain text links to Profile, Career, Selected work, Contact. No buttons in the header.
- Header is not `absolute`; it sits in normal flow so nothing overlaps the hero.

### `components/layout/logo/index.tsx`
Remove the SVG logo. Replace with the text wordmark component, or delete if the header handles it.

### `components/home/hero-section/index.tsx`
Current: "I'm Sruthi" with a waving-hand animation, cut-out PNG positioned `absolute` on the right half.
New:
- Name as `h1` at Display size, flush left, possibly across two lines.
- Professional title and one-sentence statement in Lead size below.
- Real portrait photograph as a plain rectangle at 4:5, placed in the grid (columns 8–12), not absolutely positioned.
- Delete the wave icon, the `.wave` animation and keyframes, and the duplicated mobile/desktop image.

### `components/home/hero-section/contact-bar/index.tsx`
Current: icon + label items and round social icons.
New: one row of plain text: email, phone (optional), location, LinkedIn. `Small` size, `--color-ink`, separated by space, not by icons or middle dots. Links must actually work (the template blocks them with `e.preventDefault()` and `href="#!"`; remove that everywhere).

### `components/home/about-me/index.tsx` → Profile
Current: gray band, giant outline "RESUME" SVG, illustration, stat counters, language pills.
New:
- Title "Profile" in columns 1–4; two or three serif paragraphs in columns 6–12, the first at Lead size.
- Key facts, only if real and meaningful (for example years in the field, countries worked in, programme scale), as a static definition list: number in Public Sans 800, label in Small serif. No animation, no "Happy Clients".
- Languages as a plain text line: "English, Amharic, French". No pills.
- Delete `resume-bg-img.svg` and `about-banner-img.svg`.

### `components/home/experience-sec/index.tsx` → Career
Current: hard-coded array, dot-and-line timeline, "Fulltime/Remote" labels.
New:
- Move the data into JSON (see section 9).
- Editorial list: years (tabular, Public Sans 700) | organization (Public Sans 700) with role and country beneath (serif) | one or two lines of scope (serif). Thin `--color-rule` line between entries.
- Remove the dots, the vertical line and the `( 02 )` counter.

### `components/home/education-skills/index.tsx` → Education and Expertise
Current: education with dot bullets, a decorative vector, skill cards with tool icons and 5-dot ratings.
New:
- Education: degree, institution, year. Plain list with thin rules.
- Rename skills to "Areas of expertise": a typographic list in two columns (for example "Humanitarian response", "Programme design and evaluation", "Partnership management", "Food security"). Heading plus one optional line each. No icons, no ratings, no cards.
- Delete the vector SVG and all tool icons.

### `components/home/latest-work/index.tsx` → Selected work
Current: 2-column grid, rounded images, hover blur overlay with a round arrow, arrow icons beside titles.
New:
- One **lead project** at full content width: 3:2 photograph, caption below, title, short paragraph, and a small facts list (country, years, role, partners, scale).
- Two to four **secondary projects** in a two-column grid at a clearly smaller scale: photograph, caption, title, one-line summary.
- No hover overlays, no arrows, no `rounded-lg`.
- Links to project pages only if pages exist. Otherwise, no links.

### `components/home/contact/index.tsx` → Contact
Current: form posting to `formsubmit.co` **using the template author's email address** (`bhainirav772@gmail.com`), plus blocked links.

**Endpoint.** Keep FormSubmit, but replace the template author's address with the owner's:

```
https://formsubmit.co/ajax/robertgroelsema@gmail.com
```

Store the endpoint in one constant (for example `src/data/site.ts`) so it is defined in one place. FormSubmit sends a one-time activation email to that address on the first submission; nothing is delivered until it is confirmed. After activation, FormSubmit provides a random alias string; replace the email in the endpoint with that alias so the address is not exposed in the page source.

**One form, two purposes.** A single form with a "Reason" choice:

- General enquiry
- Request a PDF copy of the CV

Fields: Name (required), Email (required), Organization (optional), Reason (required, radio buttons, not a dropdown), Message (required for enquiries, optional for CV requests).

Send these FormSubmit options with every submission:
- `_subject`: "Website enquiry" or "CV request" depending on the reason, so the two are easy to tell apart in the inbox
- `_template`: "table"
- `_captcha`: "false" (the AJAX endpoint does not show one) together with a hidden honeypot field `_honey` that real users never fill in

**Fix the template's form bugs:**
- Phone is currently required and `type="number"`. Remove the phone field.
- `reset()` mutates state directly and never clears the inputs. Reset with `setFormData(initialState)`.
- No error handling or loading state. Disable the button while sending, show a plain-text confirmation on success ("Thank you. Your message has been sent.") and a plain-text error with the email address as a fallback on failure.
- Labels stay visible above inputs (no placeholder-only labels). Errors are announced with `aria-live="polite"`.

**Design.** Title "Contact" in columns 1–4. In columns 6–12: one line of Lead text ("For enquiries or a PDF copy of my CV, please get in touch."), then the form. Inputs are square, with a 1px `--color-ink` bottom border and no rounded corners. The submit button is a square, solid `--color-ink` block with white Public Sans 700 text; on hover and focus the background changes to `--color-signal-text`. No fill animation. Beneath the form, plain text: email as a `mailto:` link, LinkedIn, location.

**Reference elsewhere.** Add one quiet line at the end of the Career section, in Small serif: "A PDF copy of this CV is available on request." linking to `#contact` and preselecting the CV request reason.

### `components/layout/footer/index.tsx`
Current: logo between two lines, credit to getnextjstemplates and ThemeWagon.
New: name, copyright year and minimal text links (LinkedIn, email), flush left. **Remove the getnextjstemplates and ThemeWagon credit** (owner's instruction).

### Optional new section: Statement
One short quote or professional statement, set in Source Serif 4 at h2 size, black on a full-width `--color-signal` band. This is the only orange band on the page. Add only if real content is supplied.

## 8. Global cleanup in `globals.css`

- Delete the global `button::before` hover-fill rule. It affects every button on the site.
- Delete `.wave` and `@keyframes wave-animation`.
- Delete `scroll-behavior: smooth` or wrap it in `@media (prefers-reduced-motion: no-preference)`.
- Rewrite `@layer base` with the new type scale.
- Simplify the `@media print` block: keep basic rules so a visitor who prints the page gets readable black text on white, hide the header, contact form and footer. Remove the `.break-page` and `.hero-section` print rules if no longer used.
- Remove the `html2pdf.js` dependency and `src/app/types/html2pdf.d.ts`. The PDF download is gone.

## 9. Content and data

- Load JSON at **build time**, not with `fetch` in `useEffect`. Import the JSON directly (`import data from "@/data/page-data.json"`), move the files from `public/data/` to `src/data/`, and remove `"use client"` from components that no longer need it. This makes content visible to search engines and avoids an empty first render.
- After this, `getDataPath` in `src/utils/image.ts` is no longer needed. Remove it.
- Suggested data structure:
  - `profile`: name, title, statement, paragraphs, languages, keyFacts
  - `career`: years, organization, role, country, scope
  - `education`: degree, institution, year
  - `expertise`: title, line
  - `work`: title, country, years, role, partners, summary, image, caption, lead (boolean)
  - `contact`: email, linkedin, location, formEndpoint
- Never invent content. Use clear placeholders like `[Organization]`, `[Year]` until real content is supplied.

## 10. Imagery

- Real photographs only: the person at work, field visits, meetings, places. No stock photography.
- Fixed aspect ratios: 3:2 for landscape, 4:5 for portraits. No other ratios.
- Plain rectangles: no `rounded-*`, no overlays, no filters, no circular avatars.
- Every field photograph has a caption in a `<figcaption>`: place, year, context. For example "Field visit, Tigray, 2019."
- Use `next/image` with Vercel's image optimization (enabled once `images.unoptimized` is removed, see section 11). Still add reasonably sized originals (around 2400px on the long edge, WebP or high-quality JPEG). Always set width, height, `sizes` and meaningful `alt` text; use `priority` only on the hero portrait.
- Placeholder until real photos arrive: a `--color-field` rectangle at the correct ratio with the intended caption. Never insert stock images.
- Delete the template's sample images in `public/images/` once replaced.

## 11. Deployment, licensing and repository

The site is hosted on **Vercel**, served from the owner's own custom domain at the root.

- Simplify `next.config.ts` for Vercel: remove the `/Resume-Nextjs` basePath logic entirely (no `basePath`, no `assetPrefix`, no `NEXT_PUBLIC_BASE_PATH`), remove `output: "export"`, `images: { unoptimized: true }` and `trailingSlash`. Keep `eslint.ignoreDuringBuilds` only if needed for the build to pass; prefer fixing lint errors.
- Remove `getImgPath` from `src/utils/image.ts` and use plain paths like `/images/portrait.webp`. Delete the file if nothing else uses it.
- Do not create a `public/CNAME` file or any GitHub Pages configuration.
- Set `metadataBase` in `layout.tsx` to `https://[domain]` so Open Graph images and canonical URLs resolve correctly. Ask for the exact domain.
- Add `src/app/robots.ts` and `src/app/sitemap.ts` pointing to the custom domain.
- The contact form posts directly to FormSubmit from the browser, so no server code or environment variables are needed.
- Owner's tasks, outside the code: import the GitHub repository into Vercel (framework preset: Next.js, default build settings), add the custom domain under Project Settings → Domains, and add the DNS records Vercel shows at the domain registrar. Vercel issues the HTTPS certificate automatically.
- npm only. `package-lock.json` is the only lockfile.

## 12. Banned patterns

Search for and remove these. Never introduce them.

- Tailwind: `rounded-*` (including `rounded-full`, `rounded-lg`), `shadow-*`, `bg-gradient-*`, `from-*`/`to-*` gradient stops, `backdrop-blur-*`, `blur-*`, `animate-*`, `hover:scale-*`, `hover:-translate-*`, `uppercase`, `tracking-widest`
- SVG attributes `rx` and `ry` used to round shapes
- CSS: `border-radius`, `box-shadow`, `text-shadow`, gradients, `@keyframes`, decorative `::before` fills
- Section counters like `( 01 )`. Sections are not a sequence.
- Icons beside contact items, social icon rows, tool icons, skill ratings, stat counters, emoji
- `position: absolute` used for layout or overlap (allowed only for accessibility utilities)
- `href="#!"` and `e.preventDefault()` on real links
- Pill buttons and tags

Motion: only state changes the user triggers (focus, menu). Respect `prefers-reduced-motion`.

## 13. Accessibility and quality

- One `h1` (the name). Logical heading order.
- Semantic elements: `header`, `nav`, `main`, `section` with `aria-labelledby`, `figure` and `figcaption`, `dl` for key facts.
- Visible focus: `outline: 3px solid var(--color-signal-text); outline-offset: 3px`.
- AA contrast everywhere (see section 4).
- Responsive checks at 375px, 768px, 1280px and 1600px. On mobile the 12-column grid becomes one column, with the same left edge and type hierarchy.
- Form check: test both reasons end to end after FormSubmit activation; confirm the subject lines arrive correctly and the honeypot blocks a filled `_honey` field.
- `npm run build` must complete with no errors.

## 14. Working process

Work in phases. Stop and report at the end of each phase. Do not continue without approval.

**Phase 1 — Audit (no changes).** Confirm the findings in this brief against the code. List every component, every color usage, every banned pattern, every dependency, and anything this brief missed. Report back.

**Phase 2 — Foundation.** Fonts, color tokens, type scale, `globals.css` cleanup, dependency cleanup, move JSON to build-time imports. Report what changed and what was removed.

**Phase 3 — Sections, one at a time,** in the order of section 7. After each section, take a screenshot if possible and check it against section 15 before reporting.

**Phase 4 — Cleanup and checks.** Remove unused assets and code. Run the checks below. Report results.

## 15. Checks before calling anything done

Each search should return nothing:

```bash
grep -rnE "rounded|shadow-|gradient|backdrop-blur|blur-|animate-|uppercase|tracking-wid" src
grep -rnE "#FE4300|orange-|text-secondary|softGray|mistGray|Bricolage" src
grep -rn "#!" src
grep -rnE "bhainirav|getnextjstemplates|ThemeWagon|Resume-Nextjs|html2pdf|window.print" src next.config.ts package.json
grep -rnE "text-center|justify-center" src   # review each remaining result; most should be gone
```

Visual checklist:

- [ ] Squint test: the page reads as a few strong masses (name, headlines, orange rules, photographs), not many small pieces.
- [ ] Every section starts on the same left edge.
- [ ] Nobody who knows this template would recognize it.
- [ ] Headlines are heavy and dense; body text is black serif, comfortable to read.
- [ ] Orange appears only as section rules, at most one band, and link/focus color.
- [ ] Each section has one clear lead element.
- [ ] Every field photograph has a caption.
- [ ] Nothing floats, overlaps, rounds, glows or animates on its own.
- [ ] Remove one more element. If the page does not get worse, leave it out.

## 16. When unsure

Ask instead of guessing on content (names, dates, roles, photos, domain). On design questions not covered here, choose the more restrained option and note the decision in your report.
