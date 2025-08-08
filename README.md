# qwerasd

🎯 檢測鍵盤連續字的 TypeScript 工具包

可以檢測 `qwe`、`123`、`abc` 等連續字，適用於密碼強度驗證、表單驗證等場景。

## ✨ 功能特色

- 檢測 QWERTY 鍵盤連續字：`qwe`、`asd`、`zxc`
- 檢測垂直連續字：`qaz`、`wsx`、`edc`
- 檢測反向連續字：`ewq`、`tsr`、`cba`
- 檢測數字連續字：`123`、`456`、`789`
- 檢測字母連續字：`abc`、`XYZ`

## 📦 安裝

```bash
npm install qwerasd
```

## 🚀 快速開始

### 基本使用

```ts
import { isQwerty, isNumber, isUppercase, isLowercase } from "qwerasd";

// 檢測 QWERTY 鍵盤連續字
isQwerty("qwe"); // true
isQwerty("asd"); // true
isQwerty("hello"); // false

// 檢測數字連續字
isNumber("123"); // true
isNumber("456"); // true
isNumber("135"); // false

// 檢測字母連續字
isUppercase("ABC"); // true
isLowercase("xyz"); // true
```

### 進階檢測

```ts
// 檢測垂直連續字（需要第三個參數）
isQwerty("qaz", false, true); // true - q→a→z 垂直排列
isQwerty("wsx", false, true); // true - w→s→x 垂直排列

// 檢測反向連續字（需要第二個參數）
isQwerty("ewq", true); // true - qwe 的反向
isNumber("321", true); // true - 123 的反向
```

### 設定最小長度檢測

如果需要設定最小連續長度（比如密碼至少要有 4 個連續字符才算弱）：

```ts
import { useQwerty } from "qwerasd";

const detector = useQwerty(4); // 最小長度設為 4

// 長度不足會返回 false
detector.detect("qw").isConsecutive(); // false (長度只有2)
detector.detect("qwer").isConsecutive(); // true  (長度夠且連續)

// 可以鏈式調用
detector.detect("abc").isLowercase(); // true
detector.detect("1234").isNumber(); // true

// 取得詳細結果
const result = detector.getResults();
// { isQwerty: true, isUppercase: false, isLowercase: false,
//   isNumber: false, isConsecutive: true }
```

## 📚 API 參考

### 基本檢測函數

```ts
// QWERTY 鍵盤連續字檢測
isQwerty(str, 反向檢測?, 垂直檢測?)

// 字母數字連續字檢測
isUppercase(str, 反向檢測?)   // 大寫字母 ABC, DEF...
isLowercase(str, 反向檢測?)   // 小寫字母 abc, xyz...
isNumber(str, 反向檢測?)      // 數字 123, 456...
```

### 進階檢測器

```ts
const detector = useQwerty(最小長度);

detector.detect(str, 反向檢測?, 垂直檢測?)
  .isQwerty()       // 是否為鍵盤連續字
  .isConsecutive()  // 是否為任何類型的連續字
  .getResults()     // 取得詳細結果
```

### 實用範例

```ts
// 檢測單個字符串是否為連續字
const detector = useQwerty(3);
detector.detect("qwe", false, true).isConsecutive(); // true
detector.detect("abc").isConsecutive(); // true
detector.detect("x9mK#2p").isConsecutive(); // false

// 實用的密碼強度檢測
function hasWeakPattern(password) {
  const patterns = ["qwe", "asd", "zxc", "123", "456", "abc", "qaz"];
  return patterns.some((pattern) => password.includes(pattern));
}

hasWeakPattern("myqwe123"); // true - 包含弱模式
hasWeakPattern("x9mK#2p"); // false - 無弱模式
```

## 🔧 開發

```bash
npm test           # 運行測試
npm run build      # 構建發布版本
```

## 📄 授權

ISC

---

💡 **提示**：這個工具特別適合用於密碼強度檢測，幫助識別容易被猜到的連續字符密碼。
