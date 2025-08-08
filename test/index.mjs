// 主專案 - 測試 qwerasd 包的使用
const { useQwerty } = await import("qwerasd");

// 從 utils 子模組導入
const { isQwerty, isNumber, isUppercase, isLowercase } = await import(
  "qwerasd/utils"
);

console.log("🎯 測試主要功能 useQwerty:");

// 創建檢測器，設定最小長度為 3
const detector = useQwerty(3);

// 測試各種連續字符
const testCases = [
  "qwe", // QWERTY 鍵盤連續字
  "123", // 數字連續字
  "ABC", // 大寫字母連續字
  "xyz", // 小寫字母連續字
  "hello", // 非連續字
  "qaz", // 垂直連續字
];

testCases.forEach((test) => {
  const result = detector.detect(test, true, true); // 啟用反向和垂直檢測
  console.log(`"${test}":`, {
    isQwerty: result.isQwerty(),
    isNumber: result.isNumber(),
    isUppercase: result.isUppercase(),
    isLowercase: result.isLowercase(),
    isConsecutive: result.isConsecutive(),
  });
});

console.log("\n⚡ 測試 utils 子模組 - 單次檢測:");

// 快速單次檢測
const quickTests = [
  { input: "qwe", func: isQwerty, name: "isQwerty" },
  { input: "123", func: isNumber, name: "isNumber" },
  { input: "ABC", func: isUppercase, name: "isUppercase" },
  { input: "xyz", func: isLowercase, name: "isLowercase" },
];

quickTests.forEach(({ input, func, name }) => {
  console.log(`${name}("${input}"):`, func(input));
});

console.log("\n🔒 實用範例 - 密碼強度檢測:");

function checkPasswordStrength(password) {
  const result = detector.detect(password, true, true);
  return {
    password,
    hasWeakPattern: result.isConsecutive(),
    details: result.getResults(),
  };
}

const passwords = ["password123", "qwerty456", "x9mK#2p", "abcdef"];

passwords.forEach((pwd) => {
  const strength = checkPasswordStrength(pwd);
  console.log(`"${pwd}":`, {
    hasWeakPattern: strength.hasWeakPattern,
    weakTypes: Object.entries(strength.details)
      .filter(([key, value]) => key !== "isConsecutive" && value)
      .map(([key]) => key),
  });
});

console.log("\n✅ 測試完成！qwerasd 包和 utils 子模組都正常工作");
