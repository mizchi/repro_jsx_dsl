# Optional Arguments Bundle Size Issue - Minimal Reproduction

This repository demonstrates the bundle size overhead when using labeled optional arguments in JSX-like DSL functions.

## Quick Start

```bash
pnpm install
pnpm build      # moon build + vite build
pnpm dev        # dev server at http://localhost:5173
```

## Problem

When calling a function with many optional parameters, the generated JavaScript passes **all arguments explicitly** at the call site, even if most are unused.

### MoonBit Source

```moonbit
// div has 10 parameters (9 optional + 1 required)
pub fn div(
  id? : String,
  class? : String,
  style? : String,
  dyn_class? : () -> String,
  dyn_style? : () -> String,
  on? : HandlerMap,
  ref_? : ElementRef,
  attrs? : Array[(String, Attr)],
  dyn_attrs? : Array[(String, AttrValue)],
  children : Array[DomNode],
) -> DomNode { ... }

// Simple usage - only 2 arguments needed
div(class="container", [text("Hello")])
```

### Generated JavaScript

```javascript
// Expected (ideally):
div("container", [...])

// Actual (all 10 arguments passed):
div(undefined, "container", undefined, undefined, undefined,
    Option$None$2$, undefined, Option$None$3$, Option$None$4$, [...])
```

## Bundle Size

| Stage | Size |
|-------|------|
| MoonBit output | 30KB |
| Vite bundle (minify: false) | 26.47KB |
| Vite bundle (gzip) | 4.96KB |

## Bundle Size Impact

For UI code, this overhead accumulates quickly:

1. **Per-call overhead**: Each element call passes 10+ arguments instead of 1-2
2. **Option singletons**: `Option$None$X$` objects are created for different type parameters
3. **Real-world scale**: A typical UI has 100+ elements, multiplying this overhead

### Concrete Example

From the generated code:

```javascript
// div with only class="container" - 10 arguments passed
mizchi$luna$platform$dom$element$$div(
  undefined,                                        // id
  repro$jsx$45$like$src$$_main$46$constr$47$333,   // class
  undefined,                                        // style
  undefined,                                        // dyn_class
  undefined,                                        // dyn_style
  Option$None$2$,                                   // on
  undefined,                                        // ref_
  Option$None$3$,                                   // attrs
  Option$None$4$,                                   // dyn_attrs
  [...]                                             // children
)

// button with only on=events().click(...) - 12 arguments passed
mizchi$luna$platform$dom$element$$button(
  -1,             // disabled (Bool uses -1 for None)
  undefined,      // id
  undefined,      // class
  undefined,      // style
  undefined,      // dyn_class
  undefined,      // dyn_style
  undefined,      // dyn_disabled
  new Option$Some$2$(...),  // on
  undefined,      // ref_
  Option$None$3$, // attrs
  Option$None$4$, // dyn_attrs
  [...]           // children
)
```

## Reproduction

```bash
# Build MoonBit
moon build --target js

# View generated JS
cat target/js/release/build/src/src.js

# Build with Vite and check bundle size
pnpm vite build
```

## Suggested Optimization

The compiler could potentially:

1. **Truncate trailing undefined arguments** at call sites
2. **Use default parameters** in generated JS function definitions
3. **Inline small DSL functions** to eliminate the call overhead entirely

## Files

```
src/
  main.mbt          # MoonBit code using Luna's DSL
  main.js           # Entry point importing MoonBit output
  moon.pkg.json     # Package imports
moon.mod.json       # Module dependencies
index.html          # HTML entry
vite.config.js      # Vite config (minify: false for readability)
target/js/release/build/src/src.js  # Generated JavaScript
dist/               # Vite bundle output
```
