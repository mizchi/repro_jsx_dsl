# repro_jsx_dsl

Minimal reproduction for MoonBit optional arguments bundle size issue in JSX-like DSL.

## Reproduction / 再現手順

```bash
git clone https://github.com/mizchi/repro_jsx_dsl.git
cd repro_jsx_dsl
moon update && moon install
moon build --target js
pnpm install
pnpm vite build
```

## Bundle Size Results / バンドルサイズ結果

| Case | MoonBit Output | Vite (minified) | gzip |
|------|----------------|-----------------|------|
| **Case 1**: Simple Counter (5 elements) | 31 KB | 7.77 KB | 2.73 KB |
| **Case 2**: Complex App (50+ elements) | 86 KB | 20.29 KB | 5.64 KB |

## Switch Cases / ケース切り替え

Edit `src/main.mbt`:

```moonbit
fn main {
  // ===== CASE 1: Simple Counter =====
  let view = case1()

  // ===== CASE 2: Complex App =====
  // let view = case2()
  ...
}
```

## Problem / 問題

See [case1.md](./case1.md) for detailed analysis.

## Related

- https://github.com/moonbitlang/moonbit-evolution/issues/19
