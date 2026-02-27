# Historical Translation Project™ — Next.js Website

Premium research-institute website for the Historical Translation Project™, built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Framework      | Next.js 14 (App Router)             |
| Language       | TypeScript 5                        |
| Styling        | Tailwind CSS 3 + CSS custom properties |
| Content        | JSON data layer (`src/data/`)       |
| Fonts          | Cormorant Garamond + Jost + IBM Plex Mono (Google Fonts) |
| Deployment     | Vercel (zero-config)                |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header + Footer)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + CSS variables
│   ├── not-found.tsx           # 404 page
│   ├── about/page.tsx          # About the institute
│   ├── formulations/
│   │   ├── page.tsx            # Formulations listing
│   │   └── [slug]/page.tsx     # Formulation detail (dynamic, SSG)
│   ├── research/page.tsx       # Research methodology
│   ├── advisor/page.tsx        # AI Advisor — Coming Soon placeholder
│   ├── contact/page.tsx        # Contact page
│   ├── disclaimer/page.tsx     # Legal disclaimer
│   ├── privacy/page.tsx        # Privacy policy
│   └── terms/page.tsx          # Terms of use
├── components/
│   ├── Header.tsx              # Sticky header with mobile nav (client)
│   ├── Footer.tsx              # Footer with links + disclaimer (server)
│   ├── DisclaimerBanner.tsx    # FDA/research disclaimer banner (server)
│   ├── FormulationCard.tsx     # Formulation card (server)
│   ├── PageHero.tsx            # Reusable page hero (server)
│   ├── ContactForm.tsx         # Contact form (client — only form)
│   └── ScrollFadeInit.tsx      # IntersectionObserver init (client)
└── data/
    ├── formulations.ts         # JSON content layer for all formulations
    └── site.ts                 # Site config, nav links, footer links
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Deploy to Vercel

### Option A — Vercel CLI (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts — all defaults work)
vercel

# Deploy to production
vercel --prod
```

### Option B — Vercel Dashboard

1. Push project to GitHub / GitLab / Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository
4. Framework preset: **Next.js** (auto-detected)
5. No environment variables required for base deployment
6. Click **Deploy**

### Option C — One-click deploy button

Add to your repo README:
```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_ORG/htp-site)
```

---

## Adding Environment Variables (when needed)

For the contact form, you will want to connect a real form backend. Recommended options:

```bash
# .env.local (never commit this)
RESEND_API_KEY=re_xxxxxxxxxxxx          # Resend email API
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Update `src/components/ContactForm.tsx` to POST to an API route:

```
src/app/api/contact/route.ts   # Create this when ready
```

---

## Customisation Guide

### Adding a New Formulation

Edit `src/data/formulations.ts` and add a new object to the `formulations` array following the existing schema. The detail page is auto-generated via `generateStaticParams()`.

### Updating Site Name / Branding

Edit `src/data/site.ts`.

### Changing Colours

Edit CSS custom properties in `src/app/globals.css` under `:root`.

### Updating Fonts

Replace the Google Fonts import URL in `src/app/globals.css` and update font-family references in `tailwind.config.ts`.

---

## Compliance Notes

- `DisclaimerBanner` is rendered on all product pages (`/formulations/[slug]`)
- Full-page disclaimer at `/disclaimer`
- Footer contains abbreviated FDA notice on every page
- No cookies or tracking by default — add only if required by applicable law

---

## License

© Historical Translation Project™. All rights reserved.
