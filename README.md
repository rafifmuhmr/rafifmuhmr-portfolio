# rafifmuhmr — Personal Portfolio

A personal portfolio by Rafif, showcasing frontend development, UI/UX design, selected projects, and writing. Built with Next.js, TypeScript, and Bun, with English and Indonesian language support.

**Development status:** foundation stage. The header, footer, theme controls, language switcher, and local information widget are implemented. The homepage still contains placeholder content; dedicated work, about, blog, and contact pages are not yet available.

[Instagram](https://www.instagram.com/rafifmuhmr) · [Threads](https://www.threads.com/@rafifmuhmr) · [LinkedIn](https://www.linkedin.com/in/rafifmuhmr) · [GitHub](https://github.com/rafifmuhmr)

## Features

- **Responsive navigation:** desktop navigation, a mobile menu, and a header that changes appearance on scroll.
- **Internationalization:** English and Indonesian routes at `/en` and `/id`, powered by next-intl. Language changes preserve the current path, query parameters, hash, and scroll position.
- **Light and dark themes:** system preference support, an animated theme icon, and a **D** keyboard shortcut outside text inputs.
- **Local information widget:** Banyuwangi location linked to Google Maps, a live 12-hour clock, the time difference relative to the visitor, and weather from OpenWeather.
- **Collapsible widget:** closed on initial load, with its open state preserved across language changes within the same page session.
- **Interface animations:** panel, clock, temperature, and weather icon transitions, with reduced-motion support.
- **Portfolio footer:** navigation, social profiles, asset credits, copyright, and an interactive halftone wordmark.
- **Scroll-to-top control:** positioned above the footer on desktop and beneath the Social section on mobile.
- **SEO foundation:** localized metadata, canonical and hreflang URLs, sitemap, robots, JSON-LD, static Open Graph cards, and preview indexing controls.
- **Typography:** Plus Jakarta Sans and JetBrains Mono, with ligatures disabled.

## Technology Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16.4.5, App Router, Turbopack |
| UI runtime | React 19.3 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui, Nova preset with Base UI |
| Animation | Motion |
| Internationalization | next-intl |
| Themes | next-themes |
| Interface icons | Solar Icons; Lucide in selected UI components |
| Social brand icons | theSVG React |
| Flags | flag-icons |
| Weather | OpenWeather Current Weather API |
| Package manager | Bun 1.4.4 |
| Deployment target | Vercel |

See [`package.json`](./package.json) for dependencies and [`bun.lock`](./bun.lock) for resolved package versions. Cache Components are currently disabled in the Next.js configuration.

## Getting Started

### Prerequisites

- Git.
- Bun **1.4.4**, matching the `packageManager` field.
- A Node.js version compatible with Next.js 16. Node.js 22 LTS is a suitable baseline for development and deployment.
- Internet access during builds to download fonts through `next/font/google`.

### 1. Clone and install

```bash
git clone https://github.com/rafifmuhmr/rafifmuhmr-portfolio.git
cd rafifmuhmr-portfolio
bun install --frozen-lockfile
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Add your own OpenWeather API key to `.env.local`:

```dotenv
OPENWEATHER_API_KEY=your_openweather_api_key
```

| Variable | Purpose | Required |
| --- | --- | --- |
| `OPENWEATHER_API_KEY` | Fetches Banyuwangi weather on the server | Required for weather data; the page can render without it |

`.env.example` is a version-controlled template without secrets. `.env.local` contains local configuration and is ignored by Git. Keep the API key server-side: do not prefix it with `NEXT_PUBLIC_`.

Restart the development server after changing environment variables.

### 3. Start the development server

```bash
bun run dev
```

Open [localhost:3000](http://localhost:3000). Localized pages are available at [localhost:3000/en](http://localhost:3000/en) and [localhost:3000/id](http://localhost:3000/id).

## Available Commands

| Command | Description |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |
| `bunx tsc --noEmit --incremental false` | Check TypeScript types without generating JavaScript |

To preview a production build locally:

```bash
bun run build
bun run start
```

## Project Structure

```text
messages/
  en.json                    # English translations
  id.json                    # Indonesian translations
public/
  rafifmuhmr-logo.svg         # Portfolio logo
src/
  app/
    layout.tsx               # Global fonts and providers
    globals.css              # Theme tokens and global styles
    favicon.ico
    [locale]/
      layout.tsx             # Locale provider, header, footer, widget
      page.tsx               # Homepage; currently placeholder content
  components/
    home/                    # Location, clock, weather, widget animations
    layout/                  # Header, navigation, footer, social icons
    ui/                      # Project-owned UI components
    language-switcher.tsx
    theme-toggle.tsx
    theme-provider.tsx
    scroll-to-top.tsx
  config/
    location.ts              # Location, coordinates, time zone, Maps URL
    socials.ts               # Social profile URLs
  i18n/                      # next-intl routing and configuration
  lib/
    weather.ts               # Server-side weather fetching
    local-clock.ts           # Clock and time difference calculations
    utils.ts
  proxy.ts                   # Locale routing
```

## Customization

| Task | File |
| --- | --- |
| Edit homepage content | `src/app/[locale]/page.tsx` |
| Update translations | `messages/en.json` and `messages/id.json` |
| Update navigation links | `src/components/layout/header-navigation.ts` |
| Change location and time zone | `src/config/location.ts` |
| Update social profiles | `src/config/socials.ts` |
| Adjust theme tokens and typography | `src/app/globals.css` |
| Edit the header or footer | `src/components/layout/site-header.tsx` and `site-footer.tsx` |
| Change weather fetching behavior | `src/lib/weather.ts` |

Use semantic color tokens such as `background`, `foreground`, `muted`, and `border` to keep components consistent across themes. The brand accent is **#CE6B4E**. Sans typography is used for the interface, while mono typography is used for clock digits and temperatures.

### Weather and clock behavior

OpenWeather requests run on the server using the configured coordinates, Celsius units, and the active language. Fetching uses a **600-second revalidation interval** and a **5-second timeout**.

Revalidation does not mean the browser polls every ten minutes. The local clock updates every minute on the client; weather updates depend on server fetching and the Next.js cache. Missing API credentials or a failed request result in an unavailable-data state.

## Deployment

### Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel, select **Add New → Project** and import the repository.
3. Select the **Next.js** framework preset and use the repository root as the root directory.
4. Set the Build Command to `bun run build`. The Install Command can be set to `bun install --frozen-lockfile`.
5. Add `OPENWEATHER_API_KEY` under **Environment Variables** for Production and, if needed, Preview deployments.
6. Deploy, then verify `/en`, `/id`, theme switching, mobile navigation, and weather data.

New or updated environment variables require a new deployment to take effect. Do not upload `.env.local` to the repository or Vercel.

References: [Git deployments](https://vercel.com/docs/git) · [Environment variables](https://vercel.com/docs/environment-variables).

## Pre-push Checks

```bash
bun run lint
bunx tsc --noEmit --incremental false
bun run build
git status --short
```

Ensure `.env.local`, `node_modules`, `.next`, and `.vercel` are not staged. Commit `bun.lock` and `.env.example` to keep project setup reproducible.

## Search and Social Previews

Production URLs are configured in `src/config/site.ts`. Update this value when moving to a custom domain. Optional Search Console verification uses `GOOGLE_SITE_VERIFICATION`.

See [`docs/seo-launch.md`](./docs/seo-launch.md) for indexing, metadata validation, link-preview checks, and performance measurement. Static share images can be regenerated with `bun scripts/generate-social-images.tsx`.

## Roadmap

- Replace placeholder content with the hero and portfolio sections.
- Add work, about, blog, and contact pages.
- Integrate a CMS and content management dashboard.
- Extend SEO metadata and the sitemap as real portfolio pages are published.

These items describe planned work and are not implemented features.

## Credits and Licensing

- **Typefaces:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
- **Interface icons:** Solar Icons by 480 Design, with CC BY 4.0 attribution.
- **Social brand icons:** [theSVG](https://thesvg.org/), through `@thesvg/react`.
- **Weather data:** [OpenWeather](https://openweathermap.org/).
- **Halftone wordmark:** adapted from Kedhareswer Naidu's component on 21st.dev.

See [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for attribution details. Third-party assets remain subject to their respective licenses. A project-wide source code license has not yet been specified.

---

Crafted by [@rafifmuhmr](https://www.instagram.com/rafifmuhmr).
