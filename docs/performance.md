# Performance notes

## Bundle optimization — 2026-11-14

The homepage was measured with the built-in Turbopack bundle analyzer before
and after the changes. The comparison uses the same route (`/[locale]`) and
counts module bytes attributed to initial bootstrap/render-dependent client
outputs, excluding asynchronous output groups.

| Initial output | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| JavaScript | 868,343 bytes | 774,723 bytes | 10.8% |
| CSS | 102,020 bytes | 68,539 bytes | 32.8% |

These are analyzer-attributed, uncompressed sizes, not HTTP transfer sizes or
PageSpeed coverage estimates. Deferred feature chunks are downloaded separately
and are not included in the initial output totals above.

### Changes

- Removed the global `flag-icons` stylesheet. The current language switcher
  displays text labels and no flags, so loading all country flag rules was unused.
  The package remains installed for possible future flag components.
- Replaced full `motion` components with the lightweight `motion/react-m`
  components and a shared `LazyMotion` provider.
- Animation and exit features use a separate asynchronous `domAnimation` chunk.
  Drag and layout projection features are not needed by the current interface.
- Enabled LazyMotion strict mode to detect accidental reintroduction of full
  Motion components within the provider.

Production build, TypeScript, and ESLint checks passed. Animations, reduced-motion
behavior, and the widget should also be checked in the deployed browser. Compare
new PageSpeed runs after deployment; no new Lighthouse score is claimed here.

## Remaining diagnostics

- Stylesheets may still appear as render-blocking because they are needed to
  render the page correctly. Do not defer all CSS indiscriminately.
- Some JavaScript is unused during the initial Lighthouse capture but used by
  interactive controls, routing, and hydration. Inspect import chains before
  removing it.
- Next.js compatibility code may trigger the legacy JavaScript diagnostic.
  Framework-generated polyfills have not been patched or disabled.

## Repeating the analysis

```bash
bunx next analyze --output --snapshot baseline
bunx next analyze export --snapshot baseline --route '/[locale]'
```

The analyzer writes generated files under `.next/diagnostics/analyze`, which is
ignored by Git. Run a normal `bun run build` before starting the production
server after using analyzer mode.

Reference: https://motion.dev/docs/react-reduce-bundle-size
