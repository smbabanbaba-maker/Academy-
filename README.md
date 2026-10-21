# SYLUTION Learn

## Brand palette — role-based color system

All eight requested colors are now implemented as design tokens in `palette.css` (loaded after `styles.css` and `premium.css`). Colors are applied intentionally, not scattered at random:

| Color | Hex | Design role |
| --- | --- | --- |
| Signature Red | `#E51B3D` | Brand, global primary CTAs, selected main navigation |
| Royal Blue | `#2563EB` | Academic categories, exam questions and CBT selection, course discovery |
| Royal Purple | `#7047EB` | AI Tutor, study prompts, digital skills and technology |
| Emerald Teal | `#087F8C` | Languages, speaking/microphone, pronunciation and language progress |
| Luxury Gold | `#F5B942` | Certificates, achievements and premium membership accents |
| Midnight Black | `#171923` | Headings, premium membership and selected dark hero surfaces |
| Soft White | `#FAFAFC` | Main application background |
| Cool Gray | `#F0F2F6` | Neutral cards, dividers and muted interface surfaces |

A dark gold text tone (`#795005`) is used for text on pale gold backgrounds, while white or dark text is used on saturated surfaces as appropriate. Global primary actions remain red for consistency.

**Checks:** JavaScript page/interaction smoke tests, color class verification, CSS loading order, responsive token rules, and cached shell update were performed. Contrast ratios for the core accents on white were checked against WCAG AA normal-text contrast (all four tested accent pairs passed 4.5:1). This is not a substitute for complete visual QA or an accessibility audit on physical devices.

## Signature Edition — UI/UX redesign

This iteration replaces the experimental dark/pink theme with the **original approved visual direction**: predominantly white surfaces, sharp black typography, signal-red accents, clean course photographs, polished category icons, a photo-led featured banner, and discreet navigation.

### What changed

- Rebuilt **Home** with search, category shortcuts, a working three-slide editorial feature banner, progress/continue learning, photo-rich popular course cards, discovery categories, and dedicated language learning discovery.
- Rebuilt the **Course Catalog** with new cards, filtering, pricing indicators, proper all-courses reset, and search.
- Rebuilt **Languages** with individual language cards, speaking practice shortcuts, progress visuals and a more approachable featured section.
- Refined the typography, cards, forms, progress, chat, exam, course detail, lesson and profile styles to follow one visual system.
- Device-adaptive layouts at 330px, 390px, 600px, 800px, 1050px and 1280px, including portrait phones, tablets, laptops, desktops and compact landscape screens.

### Visual and functional verification

JavaScript page rendering and navigation smoke tests were run across all major screens. This does **not** mean the interface has been pixel-perfect validated on physical devices. In-browser review on Android, iPhone, tablet and desktop remains recommended.

The design rules are in `premium.css`, loaded after `styles.css` for reusable baseline components.

## What is included

This repository contains a responsive, interactive, mobile-first front-end prototype built from the approved **white / black / red** design direction.

### Screens and flows
- Home dashboard, personalized course continuation, search and categories
- Course catalog with filtering, sorting, favorites and course detail pages
- Course lesson player, notes, transcript and browser speech playback
- Languages hub, language pathways and browser speaking practice
- AI Tutor **demonstration** chat (clearly labeled; not an AI API connection)
- Timed CBT practice with multiple choice answers, scoring and review
- Progress dashboard with locally stored lesson completion
- Learner profile, saved courses, certificates preview, settings, downloads placeholder
- Instructor Studio for locally saved course drafts
- Live class concepts, membership and notifications placeholders

## Run it

**No npm install or build process needed.** Open `index.html` in a modern browser, or serve the folder with a static web server.

For local testing (recommended because service workers and some browser APIs require localhost or HTTPS):

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

### Publish a live preview
This app can be published as a static site with **GitHub Pages**. Go to **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)** and save, or import the GitHub repository into Vercel with **Framework Preset: Other** and **Output Directory: .**.

The app uses hash-based navigation, so the static server needs no rewrite rules.

## Design system

- Red: `#ed001b`
- Black: `#13151a`
- White: `#ffffff`
- Muted text: `#737e90`
- Soft red highlights: `#fff0f1`
- Fonts: Plus Jakarta Sans and DM Sans (system fallbacks)
- Responsive layouts with persistent mobile bottom navigation

## Current prototype boundaries

This is an **interactive front-end prototype, not a production LMS**. These systems require a backend before real launch:

- Real authentication, user accounts, secure sessions and permissions
- Instructor-uploaded course videos, content delivery and storage
- Payment processing and verified purchases/subscriptions
- Production AI / LLM provider integration via server APIs
- Full pronunciation evaluation (the preview relies on browser speech recognition)
- Cloud storage and synchronization of learner progress
- Live teaching, scheduling, video conferencing and notifications
- Official exam question licensing, moderation, quality review, child safety
- Certificate issuance and verification infrastructure

The example enrollments, user counts, course prices, charts, reviews and achievements are **mock/demo data** and are not business claims. Some images are remotely loaded from Unsplash; they require network connectivity.

User preference data, favorites, progress and drafts are kept **locally in the browser** via localStorage. Do not treat this as secure or backed-up student data.

## Files

```
index.html           App document
styles.css           Base reusable visual styles
premium.css          Premium UI and device-responsive refinements
palette.css             Semantic brand palette, category accents and screen-specific theming
app.js               Screens, interactions, example content and routing
icon.svg             SVG brand icon
manifest.webmanifest Progressive web app metadata
sw.js                Offline cache for the app shell
```

## Organization

**SYLUTION LTD** · SYLUTION Learn · 2026
