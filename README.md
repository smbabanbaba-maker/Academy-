# SYLUTION Learn

## Studio 2.0 UI/UX redesign

The interface was redesigned around a premium porcelain-white, midnight-black and vivid-red visual identity. The updated experience includes a bold editorial Home dashboard with illustrated book hero, curated interest cards, premium course gallery, Language Lab and AI Tutor discovery; a redesigned course catalog and language hub; revamped AI Tutor, analytics and profile views; and consistent controls, typography, spacing and micro-interactions.

The responsive CSS handles narrow phones (including 320px), conventional smartphones, tablets, desktop browsers and landscape screens. The new design layer is in `premium.css`, loaded after `styles.css`; the latter remains the foundational component CSS. Responsive rules use breakpoints at 330/390/640/820/1099/1500px. Local and simulated UI tests are helpful but not a substitute for visual QA on real devices.


**Learn. Build. Grow.** — A premium education platform concept by **SYLUTION LTD**.

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
premium.css          Studio 2.0 premium design and device-responsive refinements
app.js               Screens, interactions, example content and routing
icon.svg             SVG brand icon
manifest.webmanifest Progressive web app metadata
sw.js                Offline cache for the app shell
```

## Organization

**SYLUTION LTD** · SYLUTION Learn · 2026
