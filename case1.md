# Case 1: Optional Arguments Bundle Size Overhead

## English

### Problem Summary

When using labeled optional arguments in MoonBit functions, the generated JavaScript passes **all arguments explicitly** at every call site, even when most are `undefined`.

### Reproduction

```moonbit
// Function with 10 parameters (9 optional + 1 required)
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

// Simple usage - only 2 arguments used
div(class="container", [text("Hello")])
```

### Generated JavaScript

```javascript
// All 10 arguments are passed, unused ones become undefined/Option$None$X$
div(undefined, "container", undefined, undefined, undefined,
    Option$None$2$, undefined, Option$None$3$, Option$None$4$, [...])
```

### Bundle Size Comparison

| Case | MoonBit Output | Vite (minified) | gzip |
|------|----------------|-----------------|------|
| **Case 1**: Simple Counter (5 elements) | 31 KB | 7.77 KB | 2.73 KB |
| **Case 2**: Complex App (50+ elements) | 86 KB | 20.29 KB | 5.64 KB |

**Overhead Ratio**: Case 2 has ~2.8x more code, but 10x more elements.
This suggests significant per-element overhead from optional argument expansion.

### Impact

1. **Per-call overhead**: 10+ arguments passed instead of 2
2. **Type-specific singletons**: `Option$None$2$`, `Option$None$3$`, etc. are generated for each type parameter
3. **UI code multiplication**: Typical UI has 100+ elements, amplifying this overhead

### Suggested Optimizations

1. Truncate trailing `undefined` arguments at call sites
2. Use JS default parameters in generated function definitions
3. Inline small DSL functions to eliminate call overhead

---

## 日本語

### 問題の概要

MoonBit でラベル付きオプショナル引数を使用した関数を呼び出すと、生成される JavaScript では**すべての引数が明示的に渡される**。使用していない引数も `undefined` として渡される。

### 再現コード

```moonbit
// 10個のパラメータを持つ関数（9個がオプショナル + 1個が必須）
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

// シンプルな使用例 - 実際に使うのは2引数だけ
div(class="container", [text("Hello")])
```

### 生成される JavaScript

```javascript
// 10個すべての引数が渡される。未使用のものは undefined/Option$None$X$ になる
div(undefined, "container", undefined, undefined, undefined,
    Option$None$2$, undefined, Option$None$3$, Option$None$4$, [...])
```

### バンドルサイズ比較

| ケース | MoonBit出力 | Vite (minified) | gzip |
|--------|-------------|-----------------|------|
| **Case 1**: シンプルなカウンター (5要素) | 31 KB | 7.77 KB | 2.73 KB |
| **Case 2**: 複雑なアプリ (50+要素) | 86 KB | 20.29 KB | 5.64 KB |

**オーバーヘッド比**: Case 2 はコードが約2.8倍だが、要素数は10倍。
これはオプショナル引数展開による要素ごとのオーバーヘッドが大きいことを示唆している。

### 影響

1. **呼び出しごとのオーバーヘッド**: 2引数で済むところを10+引数渡す
2. **型パラメータごとのシングルトン**: `Option$None$2$`, `Option$None$3$` など、型ごとに別オブジェクトが生成される
3. **UI コードでの蓄積**: 一般的な UI は100+要素あるため、このオーバーヘッドが累積する

### 提案する最適化

1. 呼び出し側で末尾の `undefined` 引数を省略する
2. 生成される JS 関数定義でデフォルト引数を使用する
3. 小さな DSL 関数をインライン化して呼び出しオーバーヘッドを排除する

---

## How to Reproduce / 再現方法

```bash
cd ~/sandbox/repro_jsx_like
pnpm install
pnpm build    # moon build + vite build

# Switch cases in src/main.mbt:
# - case1(): Simple counter
# - case2(): Complex app
```

## Related

- GitHub Issue: https://github.com/moonbitlang/moonbit-evolution/issues/19
