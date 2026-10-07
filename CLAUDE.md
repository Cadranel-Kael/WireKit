# WireKit

A Laravel package: Blade components (`<wire:…>`) + a companion Alpine/TS behavior layer, consumed by other apps via
Composer (currently Plinth and the portfolio site built on it, both via a `dev-main` VCS/path dependency on this
repo). Changes here only reach a consumer after it runs `composer update cadranel-kael/wire-kit` — and if the
consumer serves pre-built assets (no Vite dev server), its own `npm run build` too, since Tailwind's JIT scan only
picks up a changed vendor file on a fresh build, not silently.

## Component architecture: Index vs. the primitive

Most components split into two PHP classes/Blade views under the same `src/View/Components/{Name}/` directory:

- `Index.php` / `index.blade.php` — the bare `<wire:button>` tag. Computes the variant/size/color classes
  (`variantClass()`, `sizeClass()`, etc.) from props, then delegates to the primitive.
- A named sub-component (e.g. `Button.php` / `button.blade.php`, reached as `<wire:button.button>`) — actually
  renders the element, receiving the already-computed classes via `$attributes`.

**Both classes often define their own copy of `variantClass()`/`sizeClass()`.** Only `Index`'s copy is live for the
bare tag — check which Blade view actually calls `$variantClass()`/`$sizeClass()` (`grep` the view, don't assume)
before editing either one, or you'll fix dead code. This bit a previous session: `Button/Button.php`'s copy of
`sizeClass()` is unused by `button.blade.php`, which takes pre-computed classes via `$attributes` instead.

`<wire:x.y>` → `WireKit\View\Components\X\Y`, registered via `Blade::componentNamespace()` in
`WireKitServiceProvider`. A custom precompiler (`src/WireKitTagCompiler.php`, extending Laravel's
`ComponentTagCompiler`) handles the `<wire:…>` tag syntax itself.

## Styling

- Tailwind utility strings built in PHP (`match ($this->variant) { ... }`), not Blade `@class` arrays, for anything
  variant/color/size-driven — follow the existing `match` pattern in a component's own class when adding a variant.
- `getColorClass()` (`src/helpers.php`, global, autoloaded by the service provider's `boot()`) maps a semantic/Tailwind
  color name to a class string for a given variant (`solid`/`border`/default) and context. It has explicit arms for
  the full Tailwind palette (red..stone) plus `core`/`white`; anything else falls through to a generic
  `text-{$color}` / `bg-{$color}` pattern assuming the consuming app defined that as a flat CSS variable (its own
  `success`/`danger`/etc. tokens), not a 50–950 Tailwind scale.
- `twMerge()` (`src/helpers.php`) does a narrow override merge for a fixed set of utility prefixes (`size-`, `text-`,
  `bg-`, `p-`, `px-`, `py-`, `w-`, `h-`, `rounded-`) — not a general Tailwind-conflict resolver. Reach for
  `$attributes->class([...])` (Blade's own merge) first; use `twMerge()` only where a prop's default needs a narrow,
  explicit override by an incoming one of those specific prefixes.
- `resources/css/app.css` ships this package's own base layer (custom variants like `@variant open`, `@variant
  loading`, layout rules keyed off `data-wire-*` attributes). A consuming app's CSS entrypoint imports it directly
  (see Plinth's `resources/css/app.css`); don't duplicate those rules downstream.

## Behavior layer (`resources/ts/`)

- One directory per component under `resources/ts/components/{kebab-name}/`: a class doing the real work (keyed off
  `data-wire-*` attributes, e.g. `data-wire-accordion`, `data-wire-group`), plus an `init{Name}s(root = document)`
  function (`initAccordions.ts`, `initDropdowns.ts`, …) that queries for every matching element under `root` and
  mounts an instance on each, returning the instances. These init functions are *not* self-running on import --
  `resources/ts/index.ts` is the single place that imports and calls all of them.
- `index.ts` calls every `init*()` from a `livewire:navigated` listener, not `DOMContentLoaded`: Livewire replaces
  the whole `<body>` on `wire:navigate`, so nothing survives that transition on its own, and `livewire:navigated`
  already fires on the initial page load too (one listener covers both cases). Custom elements
  (`customElements.define('wire-toast', …)`) are registered separately, once, in `livewire:init` instead --
  re-registering the same tag name throws.
- Most components only need that page-level re-init because their interactivity is native (`popover`, `<dialog>`)
  and keeps working regardless of which DOM node currently holds the markup -- a same-page Livewire morph that adds
  a matching element mid-session doesn't need JS to run again for those. `InlineEdit` is the documented exception:
  it needs its constructor to run on an element the instant it appears, including one added well after initial load
  (e.g. inside a toggled `@if/@else` block), so it's also re-run from `Livewire.hook('morph.added', ...)`. Follow
  that precedent if a new component has the same "must run on an element that can appear via morph, not just via a
  page navigation" requirement.
- `resources/ts/components/old/` and `old-richtext/` are superseded -- current dropdown/menu behavior is
  `components/dropdown/Dropdown.ts` + `components/menu/Menu.ts` (popover-API-based), not the `old/` versions of the
  same names. Don't extend the `old*` ones; they're dead code kept for reference/rollback.
- Plain Alpine (`x-data`, `x-on:`, `x-bind:`) is preferred over new TS for anything that's just local UI state
  (toggle, selection, reveal-on-scroll) -- reach for a TS class only for genuinely continuous/stateful behavior a
  declarative directive can't express well (an animation loop, canvas rendering, precise pointer tracking). This
  applies to *this package's own* components; it isn't a claim about what a consuming app's site-specific TS does.

## Testing

- PHP: Pest, but **no Orchestra Testbench** — `tests/Pest.php` only does `uses()->in('Unit')`, no Laravel app
  bootstrap. Tests instantiate component classes directly and assert on public props / the `variantClass()` etc.
  methods' return values, not on rendered HTML. One test directory per component, mirroring
  `src/View/Components/{Name}/` under `tests/Unit/Components/{Name}/` — when a component gets a new prop or a new
  sub-component, add the test file in the matching spot.
- JS: Vitest, `.test.ts` co-located next to the file it tests (e.g. `Menu.ts` + `Menu.test.ts`).
- `vendor/bin/pest` / a plain `vitest` run — this package doesn't use the `vite-plus` wrapper tooling (`vp check`,
  `vp fmt`) that consuming apps (Plinth, the portfolio) do; it's a plain Vite lib-mode build
  (`vite.config.ts` → `resources/ts/index.ts` → `wire-kit.{es,cjs}.js`) and plain Prettier (`.prettierrc`, with
  `prettier-plugin-blade` and `prettier-plugin-tailwindcss`).
- `composer.json` pins `phpstan.neon` at level 6 on `src/`.

## Other things in `src/`

- `src/Facades/Wire.php` — static toast helpers consumed by apps as `Wire::success()` / `::danger()` /
  `::warning()` / `::toast()`, each dispatching a `toast:show` browser event off the current Livewire component.
  Throws if called outside a Livewire request lifecycle (no component to dispatch from). Has a sizeable chunk of
  commented-out modal-proxy code — not wired up; don't assume `Wire::modal()`-style calls exist from this.
- `src/Traits/WithModal.php`, `WithToasts.php` — meant to be used *by a consuming app's own Livewire components*,
  not by anything in this package.
- `src/Support/` currently has no files — an intentionally-reserved namespace, not a dead/stale directory.
