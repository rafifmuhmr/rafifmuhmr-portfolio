# SEO Launch Checklist

## Implemented

- Localized homepage titles and descriptions using the owner's full name.
- Self-referencing canonical URLs for `/en` and `/id`.
- Reciprocal English/Indonesian hreflang links, including `x-default`.
- Open Graph and Twitter large-image cards, with static 1200 × 630 PNG images.
- WebSite, Person, and WebPage JSON-LD with verified social profile URLs.
- `/sitemap.xml` containing only currently implemented homepage routes.
- `/robots.txt`, production crawl access, and preview `noindex` metadata.
- A 48px site icon and 180px Apple touch icon.
- Optional Google Search Console HTML verification token.
- Deferred loading of the interactive footer wordmark, with reserved layout space.
- JetBrains Mono is no longer preloaded ahead of primary page content.

## After deploying

1. Open Google Search Console and create a **URL prefix** property for
   `https://rafifmuhmr-portfolio.vercel.app/`.
2. Choose HTML tag verification. Copy only the `content` token into the Vercel
   environment variable `GOOGLE_SITE_VERIFICATION`. Redeploy before verifying.
3. Submit `https://rafifmuhmr-portfolio.vercel.app/sitemap.xml`.
4. Use URL Inspection on `/en` and `/id`, run a live test, and request indexing.
5. Inspect the rendered source to confirm title, description, canonical,
   language alternatives, OG tags, and JSON-LD are present.
6. Confirm `/robots.txt`, `/sitemap.xml`, `/og/en.png`, and `/og/id.png` respond
   successfully without authentication on the production domain.
7. Check structured data with Google's Rich Results Test and Schema Markup
   Validator. A valid Person/WebSite graph does not guarantee a rich result.
8. Check the deployed pages in PageSpeed Insights on mobile and desktop.
   Review LCP, INP, and CLS using field data when enough traffic is available;
   a new site may have no field data yet.
9. Test link previews using an Open Graph debugger. Social networks can cache
   previews, so request a refresh after changing the images.

## Before publishing the main content

- Replace typography/button demo content with a real introduction, selected
  projects, useful descriptions, and contact information.
- Work, About, Blog, and Contact currently show localized coming-soon pages
  with `noindex`. Replace these with real content and update their metadata
  before adding them to the sitemap.
- Give each new page its own title, description, canonical URL, localized
  alternatives, and appropriate share metadata. Homepage canonicals live in
  the homepage file, not a parent layout, to prevent accidental inheritance.
- Add descriptive image alt text, explicit dimensions, and optimized image
  sizes. Reserve space for media to prevent layout shift.
- Link to the portfolio from the owner's real social profiles and relevant
  published work. Avoid keyword stuffing, purchased links, or fabricated claims.

## Custom domain migration

Update `src/config/site.ts`, redeploy, redirect the old production domain to
its replacement, and verify the new property in Search Console. Submit the
new sitemap and update social profile links. Never use a temporary preview
hostname as the canonical production URL.

## Regenerating social images

Run `bun scripts/generate-social-images.tsx` from the repository root. This
fetches the official Plus Jakarta Sans font and writes both OG images and
application icons. Commit the generated PNGs; image generation is not part
of a normal production request or build. Review the output visually after
changing the design or identity copy.

## Expectations

Google determines ranking, snippets, site names, and sitelinks. Metadata and
structured data help explain the site, but do not guarantee first position,
indexing, a particular snippet, or sitelinks. A distinctive name such as
`rafifmuhmr` is a more specific identity query than the common first name
`Rafif`. Rankings also depend on useful content, relevance, reputation, and
other search signals.

## References

- https://developers.google.com/search/docs/appearance/sitelinks
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- https://search.google.com/search-console
- https://pagespeed.web.dev/
