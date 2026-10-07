# CLAUDE.md — Robert J. Groelsema website brief

Read this file completely before making any change. It overrides your default styling habits and the original template's patterns.

## 1. What this project is

The personal website and online CV of Robert J. Groelsema, PhD, a senior professional with more than 40 years in international development, humanitarian work, democratic governance and peacebuilding (Catholic Relief Services, USAID, UNHCR, Peace Corps and others). The audience is boards, foundations, NGOs, government agencies and recruiters for senior roles.

The site must feel **established, serious and institutional**. A visitor should sense credibility within three seconds, before reading a word.

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4: design tokens live in `src/app/globals.css` inside `@theme`. There is no `tailwind.config` file. Do not create one.
- Hosting: **Vercel**, connected to the GitHub repository `SpecMath-HQ/-robertgroelsema`, on the owner's custom domain. Do not create GitHub Pages configuration.
- The repository is **public**. Never commit private data (home address, phone numbers).
- Package manager: **npm only.** Never use pnpm or yarn. Never create another lockfile.
- Built from the ThemeWagon "Resume" template, which has been fully replaced. Nothing of its look should remain.

## 2. Visual reference

**The design reference is the Obama Foundation website (obama.org)**, chosen by the owner. Match its institutional feel: tall condensed headlines, a serif for reading, thick black rules above sections, large solid blocks of color, square photographs, cards separated by thin vertical rules, and text links with an arrow ("Learn more →").

Take inspiration, never copy: do not reuse its logo, wording, photographs or exact brand colors, and never imitate the Foundation itself. The palette below is our own.

When in doubt, choose the option that looks more like a serious foundation or institution and less like a template or startup landing page.

## 3. Principles

1. **Typography carries the identity.** Tall, heavy, condensed headlines; dark, highly readable serif body text. No icons, illustrations or decorative effects.
2. **Visible precision.** One grid, one hard left edge, square geometry. Nothing floats, nothing overlaps.
3. **Authentic imagery, one treatment.** Real photographs, presented as plain rectangles.
4. **Color in blocks.** Color appears as a few large, solid panels, never sprinkled across text or as thin accents.
5. **Editorial hierarchy.** Every section has one lead element. Supporting material is visibly secondary.

## 4. Color

| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#000000` | All headings, body text, the heavy section rules, buttons, links |
| `--color-paper` | `#FFFFFF` | Page background |
| `--color-sun` | `#F5C518` | Color block (Areas of expertise). Black text on it: 12.9:1 |
| `--color-sky` | `#9BD8F5` | Color block (Insights). Black text on it: 13.5:1 |
| `--color-ocean` | `#2A50D0` | Footer block. White text on it: 6.7:1. Also link hover color and focus color on light backgrounds (7.6:1 on white) |
| `--color-field` | `#F1F1EE` | Quiet panel behind the contact form, and photo placeholders |
| `--color-rule` | `#A3A39E` | Thin rules between list items and the vertical rules between cards |
| `--color-muted` | `#5C5C5C` | Metadata and captions only (6.7:1 on white, 5.9:1 on field). Never body paragraphs |

Color rules:

- **Text on sun and sky is always black. Text on ocean is always white.**
- Color blocks are solid rectangles with no patterns, graphics, gradients, tints or overlays. (A drawn paper graphic was tried on Publications and rejected by the owner.)
- Color blocks on the home page: Insights (sky), Areas of expertise (sun), footer (ocean). Do not add more. No alternating gray and white section stripes.
- The previous orange palette (`#FE4300`, `#C23400`, `--color-signal`, `--color-signal-text`) has been retired. Do not reintroduce it.

## 5. Typography

| Role | Typeface | Weights | Token |
|---|---|---|---|
| Headlines, name, section titles, item titles, navigation, buttons, text links, years and numbers | **Barlow Condensed** | 600, 700, 800 | `font-display` |
| Small metadata lines (topic lines, labels on the form) | **Public Sans** | 600, 700, 800 | `font-sans` |
| Body text, descriptions, captions | **Source Serif 4** | 400, 400 italic, 600 | `font-serif` |

All three are loaded with `next/font/google` in `src/app/layout.tsx` as CSS variables (`--font-barlow-condensed`, `--font-public-sans`, `--font-source-serif`) and mapped in `@theme`. The `body` default is the serif.

### Type scale

Use only these sizes (Tailwind utilities `text-display`, `text-statement`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-label`, `text-link`):

| Element | Use | Size | Weight | Line-height |
|---|---|---|---|---|
| Display | Name in hero (`h1`) | `clamp(3.5rem, 9vw, 8.5rem)` | 800 condensed | 0.9 |
| Statement | Headline inside a color block | `clamp(2.5rem, 5.5vw, 4.5rem)` | 800 condensed | 0.95 |
| `h2` | Section titles | `clamp(2.25rem, 4.5vw, 3.75rem)` | 800 condensed | 0.95 |
| `h3` | Item titles (organizations, projects, posts) | `clamp(1.375rem, 2vw, 1.75rem)` | 700 condensed | 1.1 |
| Lead | Intro statements, profile first paragraph | `clamp(1.25rem, 1.7vw, 1.5rem)` | 400 serif | 1.45 |
| Body | Paragraphs | `1.125rem` | 400 serif | 1.65 |
| Small | Captions, metadata, card summaries | `0.9375rem` | 400 serif | 1.45 |
| Label | Topic lines, form labels | `0.875rem` | 600 sans | 1.3 |
| Link | Navigation, buttons, "Learn more →" links | `1.125rem` | 700 condensed | 1.2 |

Typography rules:

- Headlines are heavy, tall and tight. Every `h1` and `h2` is 800.
- `p` defaults to `--color-ink`, never gray.
- Body text max width about `38rem`; lead text about `46rem`.
- Everything is flush left, ragged right. No centered text.
- Sentence case everywhere. No `uppercase`, no wide tracking.
- Years and numbers use `tabular-nums`.

## 6. Layout and grid

- `.container` (max width 80rem) is the outer frame, with a 12-column grid inside.
- **Section pattern:** an **8px black rule** (`border-t-8 border-ink`) above every section, the title directly beneath it.
  - Standard sections: title in columns 1–4, content in columns 6–12 (`Section` component).
  - Wide sections: title above, content across all 12 columns (`Section wide`).
  - Block sections ("Programs" and "Latest" pattern): a solid color block in columns 1–6 holding a small label, a Statement headline and a "View … →" link; the list or cards beside it. Used for Areas of expertise (sun) and Insights (sky) (`BlockSection` component).
  - Publications and Reports: in columns 1–5, on white with no color block, the title "Publications and Reports" at Statement size, the intro line and a menu styled like the Obama program list (rows with black rules, the count and "→" at the right). This whole column **stays in view (sticky) while the visitor scrolls** on desktop. On the right, both lists run one after the other ("Selected publications", then "Selected reports"), each under its own heading with a 4px black rule, in two columns with a thin vertical rule between columns and a black line under each entry (`SectionMenu` and `TwoColumnList` components). The menu links **jump** to the start of each list (they never hide or swap content); the row of the list being read is marked by a 4px black rule and no arrow, never by a black fill, and updates as the visitor scrolls.
- **Do not apply the Publications menu pattern to Career, Consulting or Other experience.** That content is hierarchical and must read as one continuous flow. These two sections, and About Robert, borrow only the sticky title from Publications: `Section stickyTitle` keeps the section title in view on the left while the content scrolls (desktop only); nothing else about them changes.
- **Every section has a short summary under its title** (owner's rule): a brief walkthrough of what the section covers, at Lead size, drawn only from the resume. `Section summary={…}` renders it under the title (and it stays in view with a sticky title). Texts live in `STATEMENTS` in `src/data/site.ts`.
- Thin `--color-rule` lines separate list items; thin vertical `--color-rule` lines separate cards in a row.
- On mobile everything stacks in one column on the same left edge.
- Vertical rhythm: Tailwind steps 2, 4, 6, 8, 12, 16, 24, 32. Sections are separated by `pb-24` to `pb-32`.

## 7. Page structure

Home page order: hero, About Robert, Career, Consulting and other experience, Selected work, Publications, Insights (only when posts are published), Education, Areas of expertise, Contact, footer.

- **Header** (`components/layout/header`): name as a text wordmark; navigation in `text-link` condensed: About Robert, Career, Selected work, Publications and Reports, Insights (only when posts exist), Contact. Links use `/#id` so they work from every page. No buttons, no logo.
- **Hero** (`components/home/hero-section`): name as `h1` at Display size; professional title and statement in Lead; a plain text contact row (email, location, LinkedIn); portrait at 4:5 in columns 8–12.
- **About Robert** (`components/home/about-me`, anchor `#about`; renamed from "Profile" at the owner's request): serif paragraphs, the first at Lead; key facts as a `dl` with numbers in condensed 800; languages as one plain line.
- **Career** (`components/home/experience-sec`) and **Consulting and other experience** (`components/home/consulting`): the shared `EntryList` (years | organization, role, place, full description), one continuous list each. Descriptions use the full wording of the resume; long ones collapse behind a "Read more" toggle (`components/shared/read-more.tsx`) whose hidden text stays in the HTML and prints in full.
- **Selected work** (`components/home/latest-work`): a wide section with three newspaper-style columns (CSS `columns`) separated by thin vertical rules. Cards flow down each column one after the other, so they start where the previous card ends rather than on shared rows. Each card: illustration at its own proportions, topic line (client ▪ years), condensed title, role, short serif summary. "Learn more →" only if a project page exists.
- **Publications and Reports** (`components/home/publications`, anchor `#publications`; header and footer label "Publications and Reports"): see section 6. List anchors `#selected-publications` and `#selected-reports`. Each entry: year, title, description (book or journal in `<cite>`, editors, publisher, co-authors), and "Learn more →" only where a verified publisher, DOI or catalogue page exists.
- **Insights block** (`components/home/insights-latest`), modeled on "Latest": a sky block with the label "Insights", a Statement headline and "View all insights →", beside the newest posts as cards (image, topic line, title, summary, "Read more →"), separated by a vertical rule.
- **Education** (`components/home/education-skills`): `EntryList`-style list with thin rules.
- **Areas of expertise** (same file), modeled on "Programs": a sun block with a Statement headline, beside the list of areas separated by thin rules.
- **Contact** (`components/home/contact`): a `--color-field` panel with the title, the Lead line (`STATEMENTS.contact` in `site.ts`) and contact details in columns 1–5, and the form in columns 7–12. The Lead line invites organizations and individuals to work with Robert (consultancies, evaluations, longer working relationships); it never leads with the CV request. Specification in section 8.
- **Footer** (`components/layout/footer`): a full-width ocean block with the name at Statement size in white, columns of plain text links (contact, site, elsewhere), and the copyright line.
- **Insights pages** (`src/app/insights`): the index shows all posts as cards; each post page sets the title in `h1` and the body in the serif (`.article` styles in `globals.css`).

## 8. Contact form

- **The site's public address is contact@robertgroelsema.com** (in `page-data.json` → `contact.email`; shown in the hero, Contact panel, footer and the form's error fallback). Robert's personal Gmail is never shown on the site. The owner is choosing the mail service (Google Workspace, Zoho Mail or forwarding); the mailbox must exist before launch.
- Posts to FormSubmit, delivering to contact@robertgroelsema.com. The endpoint is defined once in `src/data/site.ts`. After the first submission FormSubmit sends an activation email to that address; once activated, replace the email in the endpoint with the random alias FormSubmit provides.
- One form, two purposes, chosen with radio buttons: "General enquiry" and "Request a PDF copy of the CV". **This radio option is the only place on the site that mentions the PDF CV**: never add CV-request links or lines to the header, footer, Career or any other section.
- Fields, one per line in this order: Name (required), Email (required), Phone (optional, `type="tel"`), Organization (optional), Reason (required), Message (required for enquiries, optional for CV requests). Do not change the form's layout without the owner's request.
- Every submission sends `_subject` ("Website enquiry" or "CV request"), `_template: "table"`, `_captcha: "false"` and the hidden honeypot `_honey`.
- Labels always visible above inputs. Inputs have only a 1px black bottom border. Status messages in an `aria-live="polite"` region; the button is disabled while sending; a plain-text error offers the email address as a fallback.
- The submit button is square: 2px black border, black condensed text, transparent background; on hover and focus it fills black with white text. No fill animation.

## 9. Content and data

- All content is imported at build time from `src/data/`: `page-data.json` (profile, education, expertise, contact), `career-data.json` (career, consulting, otherExperience), `work-data.json` (selected work), `publications.json` (books, chapters, articles, entries, reports), `site.ts` (form endpoint and section statements).
- Insights posts are Markdown files in `content/insights/` with front matter `title`, `date`, `summary`, `topic`, `image`, `draft`. Files starting with `_` are templates; `draft: true` posts appear only on the local development server. See `content/insights/_template.md`.
- **The owner's resume is the primary source and takes priority** over any other compilation. Use its wording; remove only street addresses and fix obvious typos, and report every such change.
- Add publications from other sources only when verified against a primary source (publisher, DOI, journal or encyclopedia page) and only when they do not conflict with the resume. Distinguish authorship from contribution or acknowledgment; do not list contributions as publications.
- Never invent content. Use clear placeholders like `[Year]` or `[Photograph to come]` until real content is supplied.
- **Organization links, no logos** (owner's decision): organization and institution names in Career, Consulting, Other experience and Education link to the organization's verified official website through a `links` array (`{ name, url }`) in `career-data.json` and `page-data.json`, rendered by `components/shared/linked-name.tsx` (black text, underline and ocean on hover, new tab, screen-reader note). The visible wording never changes; only the listed part of a name is linked. Merged organizations link to their successor (ARD → Tetra Tech; Pitt GSPIA and IMDI → SPIA). No link for USAID (closed in 2025; usaid.gov shows only a notice) or for organizations with no verified official site (IHAP, Badjao, Michigan Economics for Human Development, Development Assistance Corporation). Never guess a URL: several obvious domains now belong to unrelated organizations. Never add organization logos.

## 10. Imagery

- Real photographs: the person at work, field visits, meetings, places. No stock photography, and never images taken from other organizations' publications or websites without permission.
- **Exception, Selected work:** the owner commissioned AI-generated editorial illustrations (one per project, in `public/images/work/`). **The owner chooses the style per image; do not push any single style** (the owner explicitly rejected black-ink linocut as a house style). What has worked: warm, colorful, painterly scenes with real atmosphere (the owner's favorite is the Liberia blue watercolor, `community-radio-voices-liberia.png`). What has failed: poster-style scenes where every image reused the same characters, outfits and site colors, and a stock "dictionary" photo that was off-topic and likely licensed. Each image must show its own project, place and people (new characters every time; generate each in a fresh chat), and vary subject, viewpoint and scale so the set never repeats itself. The REGAL-IR card uses a photograph supplied by the owner (`community-meeting-arid-lands-northern-kenya.jpg`, alt text beginning "Photograph:"); the owner is responsible for its rights. Generated images' alt text always begins "Illustration:" so they are never presented as photographs. They must contain no text, logos or flags, never depict real identifiable people (including Robert), and show people with dignity and agency. File names are descriptive and hyphenated for search engines (for example `community-protection-committee-hf-radio-south-kivu-drc.png`). Generated images should be at least 1536px on the long edge; small downloads (under about 1000px) look soft and are usually someone else's photo.
- Ratios: 4:5 for the hero portrait, 1:1 for Insights cards, 3:2 for other landscape images. Selected work images keep their own proportions (`ratio="natural"` with `imageWidth`/`imageHeight` in `work-data.json`), but tall images are cropped on the page with `crop` (aspect ratio, for example `"4 / 5"`) and `focus` (object-position, for example `"50% 80%"`) so all Selected work cards fit within one 900px-tall screen. The image files themselves are never cropped. Check after any image change that no subject's head or key object is cut off.
- Plain rectangles: no `rounded-*`, no overlays, no filters, no circular avatars.
- Context (place, year) goes in a `figcaption` or the card's topic line.
- `next/image` with Vercel image optimization; originals around 2400px on the long edge; always set width, height, `sizes` and meaningful `alt`; `priority` only on the hero portrait.
- Placeholder until real photos arrive: a `--color-field` rectangle at the correct ratio, hidden from assistive technology.
- Delete the template's sample images in `public/images/` once nothing uses them.

## 10a. Favicon

- The site icon is an "RG" monogram drawn in code, not an image file: white Barlow Condensed ExtraBold on `--color-ocean`, in a square (`src/app/monogram.tsx`, used by `src/app/icon.tsx` for a single 512px tab icon and `src/app/apple-icon.tsx` for the 180px iPhone icon). **Never use `generateImageMetadata` for the icons**: it made Vercel render them per request, where the font file is not available, and the tab icon failed with a 500 error (the browser showed a globe). The font file is `src/app/fonts/BarlowCondensed-ExtraBold.ttf` (SIL Open Font License, `OFL.txt` alongside). Icons are generated once at build time. Do not add a `favicon.ico`; the template's was removed.

## 11. Deployment

- `next.config.ts` is empty on purpose (no basePath, no static export, image optimization on).
- **Domain: https://robertgroelsema.com** (registered by the owner). It is defined once as `SITE_URL` in `src/data/site.ts` and used by `metadataBase` in `layout.tsx`, `src/app/robots.ts` and `src/app/sitemap.ts`. The sitemap lists the home page, plus the Insights index and published posts once any exist (drafts never). The owner may also register robertgroelsema.org; if so, redirect it to the .com in Vercel rather than serving the site twice.
- Owner's tasks: import the GitHub repository into Vercel (preset Next.js), add the custom domain, add the DNS records Vercel shows.
- **Never run `npm run build` while the dev server is running**: both use `.next` and the dev server breaks. Stop the dev server, build, delete `.next`, restart.

## 12. Banned patterns

- Tailwind: `rounded-*`, `shadow-*`, `bg-gradient-*`, gradient stops, `backdrop-blur-*`, `blur-*`, `animate-*`, `hover:scale-*`, `hover:-translate-*`, `uppercase`, `tracking-widest`
- SVG `rx`/`ry`; CSS `border-radius`, `box-shadow`, `text-shadow`, gradients, `@keyframes`, decorative `::before` fills
- Section counters like `( 01 )`
- Icon images and icon fonts: no icons beside contact items, social icon rows, tool icons, ratings, stat counters, emoji
- `position: absolute` for layout or overlap
- `href="#!"` and `e.preventDefault()` on real links
- Pill buttons and tags

Allowed typographic characters: the arrow "→" at the end of a text link that navigates ("Learn more →", "View all insights →", "Source →"), and the small square "▪" between items in a topic line ("USAID/Kenya ▪ 2012–2014"). Toggles that expand text in place ("Read more") take no arrow.

Motion: only state changes the user triggers (focus, hover color, menu, expand). Respect `prefers-reduced-motion`.

## 13. Accessibility and quality

- One `h1` per page. Logical heading order (`EntryList` takes a `headingLevel` prop when nested under a subheading).
- The Publications menu is a `nav` of ordinary in-page links; the current row carries `aria-current="true"`.
- `position: sticky` is allowed for the Publications title column and the About Robert, Career and Consulting section titles; it never overlaps other content.
- Semantic elements: `header`, `nav`, `main`, `section` with `aria-labelledby`, `figure`/`figcaption`, `dl` for key facts, `cite` for titles of works.
- Visible focus: `outline: 3px solid var(--color-ocean); outline-offset: 3px`; white outline inside the ocean footer.
- AA contrast everywhere (section 4).
- Responsive checks at 375px, 768px, 1280px and 1600px.
- Form check: test both reasons end to end after FormSubmit activation.
- `npm run build` and `npx next lint` complete with no errors.

## 14. Working process

Phases 1 (audit), 2 (foundation) and 3 (sections) are complete; the Obama Foundation redesign is applied on top of them. Remaining: **Phase 4 — cleanup and checks** (remove unused template images and `public/.nojekyll`, run the checks below). Robots and sitemap are done.

Stop and report after each substantial piece of work. Ask the owner before committing or pushing.

## 15. Checks before calling anything done

Each search should return nothing:

```bash
grep -rnE "rounded|shadow-|gradient|backdrop-blur|blur-|animate-|uppercase|tracking-wid" src
grep -rnE "#FE4300|#C23400|signal|orange-|text-secondary|softGray|mistGray|Bricolage" src
grep -rn "#!" src
grep -rnE "bhainirav|getnextjstemplates|ThemeWagon|Resume-Nextjs|html2pdf|window.print" src next.config.ts package.json
grep -rnE "text-center|justify-center" src
```

Visual checklist:

- [ ] Squint test: the page reads as a few strong masses (name, black rules, condensed headlines, color blocks, photographs).
- [ ] Every section starts on the same left edge, under an 8px black rule.
- [ ] Color appears only as solid blocks (sun, sky, ocean) and the field panel.
- [ ] Headlines are tall, heavy and condensed; body text is black serif.
- [ ] Each section has one clear lead element.
- [ ] Nothing floats, overlaps, rounds, glows or animates on its own.

## 16. When unsure

Ask instead of guessing on content (names, dates, roles, photos, domain). On design questions not covered here, choose what the Obama Foundation site would do, in its more restrained form, and note the decision in your report.
