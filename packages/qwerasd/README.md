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

### useQwerty 檢測器

`useQwerty` 是本套件的核心功能，提供完整的鍵盤連續字檢測能力：

```ts
import { useQwerty } from "qwerasd";

const detector = useQwerty(3); // 設定最小長度為 3

// 檢測各種連續字
detector.detect("qwe").isQwerty(); // true - QWERTY 鍵盤連續字
detector.detect("123").isNumber(); // true - 數字連續字
detector.detect("abc").isLowercase(); // true - 小寫字母連續字
detector.detect("XYZ").isUppercase(); // true - 大寫字母連續字

// 檢測任何類型的連續字
detector.detect("qwe").isConsecutive(); // true
detector.detect("hello").isConsecutive(); // false

// 獲取詳細結果
const result = detector.detect("qwer").getResults();
// { isQwerty: true, isUppercase: false, isLowercase: false,
//   isNumber: false, isConsecutive: true }
```

### 進階檢測選項

```ts
// 檢測反向連續字
detector.detect("ewq", true); // true - qwe 的反向
detector.detect("321", true); // true - 123 的反向

// 檢測垂直連續字（僅適用於 QWERTY）
detector.detect("qaz", false, true); // true - q→a→z 垂直排列
detector.detect("wsx", false, true); // true - w→s→x 垂直排列
```

### 單次檢測場景

如果只需要簡單的單次檢測，可以從 `qwerasd/utils` 導入這些便利函數：

```ts
import { isQwerty, isNumber, isUppercase, isLowercase } from "qwerasd/utils";

// 快速檢測 QWERTY 鍵盤連續字
isQwerty("qwe"); // true
isQwerty("asd"); // true
isQwerty("hello"); // false

// 快速檢測數字連續字
isNumber("123"); // true
isNumber("456"); // true
isNumber("135"); // false

// 快速檢測字母連續字
isUppercase("ABC"); // true
isLowercase("xyz"); // true

// 支援反向和垂直檢測
isQwerty("ewq", true); // true - 反向檢測
isQwerty("qaz", false, true); // true - 垂直檢測
```

> **💡 提示**：您也可以從主模組導入這些函數 `import { isQwerty } from "qwerasd"`，兩種方式都可以使用。

## 📚 API 參考

### useQwerty

```ts
const detector = useQwerty(最小長度);

detector.detect(str, 反向檢測?, 垂直檢測?)
  .isQwerty()       // 是否為 QWERTY 鍵盤連續字
  .isNumber()       // 是否為數字連續字
  .isUppercase()    // 是否為大寫字母連續字
  .isLowercase()    // 是否為小寫字母連續字
  .isConsecutive()  // 是否為任何類型的連續字
  .getResults()     // 取得詳細結果對象
```

**參數說明：**

- `最小長度`：檢測的最小字符長度，小於此長度的字串會返回 false
- `str`：要檢測的字串
- `反向檢測`：是否包含反向字串檢測（可選，預設 false）
- `垂直檢測`：是否包含垂直排列檢測（可選，預設 false，僅適用於 QWERTY）

### 額外功能：直接檢測函數 (`qwerasd/utils`)

這些函數提供快速的單次檢測，適合簡單使用場景：

```ts
// 從 utils 模組導入
import { isQwerty, isUppercase, isLowercase, isNumber } from "qwerasd/utils";

// QWERTY 鍵盤連續字檢測
isQwerty(str, 反向檢測?, 垂直檢測?)

// 字母數字連續字檢測
isUppercase(str, 反向檢測?)   // 大寫字母 ABC, DEF...
isLowercase(str, 反向檢測?)   // 小寫字母 abc, xyz...
isNumber(str, 反向檢測?)      // 數字 123, 456...
```

### 實用範例

#### 使用 useQwerty 進行密碼強度檢測

```ts
import { useQwerty } from "qwerasd";

// 創建檢測器，設定最小連續長度為 3
const detector = useQwerty(3);

function checkPasswordStrength(password: string) {
  // 檢查密碼中是否包含連續字符
  const hasWeak = detector.detect(password, true, true).isConsecutive();

  return {
    password,
    hasWeakPattern: hasWeak,
    details: detector.getResults(),
  };
}

// 測試不同密碼
checkPasswordStrength("myqwe123");
// { password: "myqwe123", hasWeakPattern: true,
//   details: { isQwerty: true, isNumber: true, ... } }

checkPasswordStrength("x9mK#2p");
// { password: "x9mK#2p", hasWeakPattern: false,
//   details: { isQwerty: false, isNumber: false, ... } }
```

#### 快速檢測（使用 utils 模組）

```ts
import { isQwerty, isNumber } from "qwerasd/utils";

// 簡單的弱密碼模式檢測
function hasSimpleWeakPattern(password: string) {
  const commonPatterns = ["qwe", "asd", "zxc", "123", "456", "abc"];
  return commonPatterns.some(
    (pattern) =>
      password.includes(pattern) ||
      isQwerty(pattern, true) ||
      isNumber(pattern, true)
  );
}

hasSimpleWeakPattern("password123"); // true
hasSimpleWeakPattern("x9mK#2p"); // false
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
