# qwerasd

鍵盤連續字檢測工具（TypeScript）。支援 QWERTY 水平/垂直連續字偵測、反向檢測、大寫/小寫/數字連續字，並提供完整的型別與 JSDoc 提示。可用於密碼強度檢測等情境。

## 特性

- 支援 QWERTY 水平與垂直連續字
- 支援反向檢測（例如 `ewq`, `zaq`）
- 支援大寫、小寫、數字連續字
- 最小長度門檻設定（`useQwerty(length)`）
- 友好的型別定義與 JSDoc
- 轉型調用（toString / valueOf / toJSON）

## 安裝

```bash
pnpm add qwerasd
# 或
npm i qwerasd
# 或
yarn add qwerasd
```

## 快速上手

### 單次判斷 API

適合不需要持久狀態時使用：

```ts
import { isQwerty, isUppercase, isLowercase, isNumber, table } from "qwerasd";

isQwerty("qwe"); // true（水平）
isQwerty("qaz", false, true); // true（垂直）
isQwerty("ewq", true); // true（反向）

isUppercase("ABC"); // true
isLowercase("abc"); // true
isNumber("1234"); // true

console.log(table.qwerty); // ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
```

- `isQwerty(str, incluedReversed = false, includeVertical = false)`
  - `incluedReversed`: 是否啟用反向檢測（例如 `ewq`）
  - `includeVertical`: 是否啟用垂直檢測（例如 `qaz`、`wsx`）

### 進階：帶狀態的檢測器

當你需要設定「最小連續長度」並做多次檢測時，使用 `useQwerty(length)`：

```ts
import { useQwerty } from "qwerasd";

const detector = useQwerty(3); // 設定最小長度為 3

detector
  .detect("qwe") // 會重置並檢測一次，回傳 this，可鏈式調用
  .isQwerty(); // true

detector.detect("qaz", false, true).isQwerty(); // true（垂直）

detector.detect("ewq", true).isQwerty(); // true（反向）

// 取得各分類結果與總結果
const results = detector.getResults();
// results: { isQwerty, isUppercase, isLowercase, isNumber, isConsecutive }

// 總結果（任一類別為 true 即 true）
detector.isConsecutive();
```

`detect(str, incluedReversed = false, includeVertical = false)` 每次呼叫都會重置內部結果並重新檢測，回傳 `this`（支援方法鏈）。

### 型別

```ts
export interface DetectResult {
  isQwerty: boolean;
  isUppercase: boolean;
  isLowercase: boolean;
  isNumber: boolean;
  // 任一分類為 true 即為 true
  isConsecutive: boolean;
}
```

### 轉型調用

`useQwerty` 產生的檢測器支援以下轉型：

```ts
const detector = useQwerty(3);
const result = detector.detect("abc");

String(result); // "true" / "false"（toString）
+result; // 1 / 0（valueOf）
JSON.stringify(result); // { isQwerty, isUppercase, isLowercase, isNumber, isConsecutive }
```

## API 參考

### `isQwerty(str: string, incluedReversed?: boolean, includeVertical?: boolean): boolean`

- 判斷是否為 QWERTY 鍵盤連續字
- `incluedReversed`: 是否包含反向（預設 false）
- `includeVertical`: 是否包含垂直（預設 false）

### `isUppercase(str: string, incluedReversed?: boolean): boolean`

- 判斷是否為大寫字母連續字

### `isLowercase(str: string, incluedReversed?: boolean): boolean`

- 判斷是否為小寫字母連續字

### `isNumber(str: string, incluedReversed?: boolean): boolean`

- 判斷是否為數字連續字

### `useQwerty(length: number)`

回傳具狀態的檢測器實例，常用方法：

- `detect(str, incluedReversed = false, includeVertical = false)` → this
- `isQwerty()` / `isUppercase()` / `isLowercase()` / `isNumber()` → boolean
- `isConsecutive()` → boolean（總結果）
- `getResults()` → `DetectResult`

### `table`

鍵盤/字符表，預設包含：

- `qwerty`: ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
- `uppercase`: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
- `lowercase`: ["abcdefghijklmnopqrstuvwxyz"]
- `number`: ["0123456789"]
- `symbol`: ["`~!@#$%^&\*()\_+-[]\\;',./\""]

## 測試與建置

```bash
pnpm test           # 執行測試（Jest）
pnpm run test:watch # 監看模式
pnpm run test:coverage # 覆蓋率

pnpm run build      # 產出到 dist/，包含 d.ts 型別定義
```

> 注意：發佈/建置時不會將 `test/` 編譯進 `dist/`。

## 相容性

- Node.js 與瀏覽器皆可使用
- TypeScript 目標建議 `es2017` 或以上

## 授權

ISC
