# Case 1: Optional Arguments Bundle Size Overhead

## English

I created a small repository to reproduce the issue.

```bash
git clone https://github.com/mizchi/repro_jsx_dsl.git
cd repro_jsx_dsl
moon update && moon install
moon build --target js
npm install
npx vite build
```

I've committed two minified JS files so you can see the results directly:

[Simple case](https://github.com/mizchi/repro_jsx_dsl/blob/main/memo/index-case1.js)

[Complex case](https://github.com/mizchi/repro_jsx_dsl/blob/main/memo/index-case2.js)

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

---

## 日本語

問題を再現するための小さなリポジトリを作成しました。

```bash
git clone https://github.com/mizchi/repro_jsx_dsl.git
cd repro_jsx_dsl
moon update && moon install
moon build --target js
npm install
npx vite build
```

とりあえず結果だけ見るために、minify済みの2種のjsをコミットしてあります。

[シンプルなケース](https://github.com/mizchi/repro_jsx_dsl/blob/main/memo/index-case1.js)

[複雑なケース](https://github.com/mizchi/repro_jsx_dsl/blob/main/memo/index-case2.js)

### 生成される JavaScript の一部

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
