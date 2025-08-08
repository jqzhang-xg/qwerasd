"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe("鍵盤連續字檢測器", () => {
    describe("useQwerty 工廠函數", () => {
        test("應該返回 QwertyDetector 實例", () => {
            const detector = (0, index_1.useQwerty)(3);
            expect(detector).toHaveProperty("detect");
            expect(detector).toHaveProperty("isConsecutive");
            expect(detector).toHaveProperty("results");
        });
        test("應該正確設置檢測長度", () => {
            const detector = (0, index_1.useQwerty)(5);
            const result = detector.detect("qwe"); // 長度不足
            expect(result.isConsecutive()).toBe(false);
        });
    });
    describe("QWERTY 鍵盤檢測", () => {
        let detector;
        beforeEach(() => {
            detector = (0, index_1.useQwerty)(3);
        });
        test("應該檢測到 QWERTY 連續字", () => {
            const testCases = [
                "qwe",
                "wer",
                "ert",
                "rty",
                "tyu",
                "yui",
                "uio",
                "iop",
                "asd",
                "sdf",
                "dfg",
                "fgh",
                "ghj",
                "hjk",
                "jkl",
                "zxc",
                "xcv",
                "cvb",
                "vbn",
                "bnm",
            ];
            testCases.forEach((str) => {
                const result = detector.detect(str);
                expect(result.isQwerty()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
                expect(result.getResults().isQwerty).toBe(true);
                expect(result.getResults().isConsecutive).toBe(true);
            });
        });
        test("應該檢測到反向 QWERTY 連續字", () => {
            const testCases = ["ewq", "rew", "tre", "ytr"];
            testCases.forEach((str) => {
                const result = detector.detect(str, true);
                expect(result.isQwerty()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
            });
        });
        test("應該拒絕非 QWERTY 連續字", () => {
            const testCases = ["abc", "hello", "world", "random"];
            testCases.forEach((str) => {
                const result = detector.detect(str);
                expect(result.isQwerty()).toBe(false);
            });
        });
    });
    describe("大寫字母檢測", () => {
        let detector;
        beforeEach(() => {
            detector = (0, index_1.useQwerty)(3);
        });
        test("應該檢測到大寫字母連續字", () => {
            const testCases = ["ABC", "DEF", "XYZ", "ABCDEF"];
            testCases.forEach((str) => {
                const result = detector.detect(str);
                expect(result.isUppercase()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
                expect(result.getResults().isUppercase).toBe(true);
            });
        });
        test("應該檢測到反向大寫字母連續字", () => {
            const testCases = ["CBA", "FED", "ZYX"];
            testCases.forEach((str) => {
                const result = detector.detect(str, true);
                expect(result.isUppercase()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
            });
        });
    });
    describe("小寫字母檢測", () => {
        let detector;
        beforeEach(() => {
            detector = (0, index_1.useQwerty)(3);
        });
        test("應該檢測到小寫字母連續字", () => {
            const testCases = ["abc", "def", "xyz", "abcdef"];
            testCases.forEach((str) => {
                const result = detector.detect(str);
                expect(result.isLowercase()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
                expect(result.getResults().isLowercase).toBe(true);
            });
        });
        test("應該檢測到反向小寫字母連續字", () => {
            const testCases = ["cba", "fed", "zyx"];
            testCases.forEach((str) => {
                const result = detector.detect(str, true);
                expect(result.isLowercase()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
            });
        });
    });
    describe("數字檢測", () => {
        let detector;
        beforeEach(() => {
            detector = (0, index_1.useQwerty)(3);
        });
        test("應該檢測到數字連續字", () => {
            const testCases = ["123", "456", "789", "0123", "6789"];
            testCases.forEach((str) => {
                const result = detector.detect(str);
                expect(result.isNumber()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
                expect(result.getResults().isNumber).toBe(true);
            });
        });
        test("應該檢測到反向數字連續字", () => {
            const testCases = ["321", "654", "987"];
            testCases.forEach((str) => {
                const result = detector.detect(str, true);
                expect(result.isNumber()).toBe(true);
                expect(result.isConsecutive()).toBe(true);
            });
        });
        test("應該處理數字類型輸入", () => {
            const result = detector.detect(123);
            expect(result.isNumber()).toBe(true);
            expect(result.isConsecutive()).toBe(true);
        });
    });
    describe("邊界情況", () => {
        test("長度不足的字串應該返回全部 false", () => {
            const detector = (0, index_1.useQwerty)(5);
            const result = detector.detect("ab");
            expect(result.isQwerty()).toBe(false);
            expect(result.isUppercase()).toBe(false);
            expect(result.isLowercase()).toBe(false);
            expect(result.isNumber()).toBe(false);
            expect(result.isConsecutive()).toBe(false);
        });
        test("應該拒絕無效輸入類型", () => {
            const detector = (0, index_1.useQwerty)(3);
            expect(() => {
                // @ts-expect-error 故意傳入無效類型以測試錯誤處理
                detector.detect(null);
            }).toThrow("str must be a string or number");
            expect(() => {
                // @ts-expect-error 故意傳入無效類型以測試錯誤處理
                detector.detect(undefined);
            }).toThrow("str must be a string or number");
        });
    });
    describe("轉型調用", () => {
        let detector;
        beforeEach(() => {
            detector = (0, index_1.useQwerty)(3);
        });
        test("toString() 應該返回總結果的字符串", () => {
            const trueDetector = (0, index_1.useQwerty)(3);
            const falseDetector = (0, index_1.useQwerty)(3);
            const trueResult = trueDetector.detect("abc");
            const falseResult = falseDetector.detect("hello");
            expect(trueResult.toString()).toBe("true");
            expect(falseResult.toString()).toBe("false");
            expect(String(trueResult)).toBe("true");
        });
        test("valueOf() 應該返回數值", () => {
            const trueDetector = (0, index_1.useQwerty)(3);
            const falseDetector = (0, index_1.useQwerty)(3);
            const trueResult = trueDetector.detect("123");
            const falseResult = falseDetector.detect("hello");
            expect(trueResult.valueOf()).toBe(1);
            expect(falseResult.valueOf()).toBe(0);
            expect(+trueResult).toBe(1);
            expect(+falseResult).toBe(0);
        });
        test("toJSON() 應該返回完整結果對象", () => {
            const result = detector.detect("abc");
            const json = result.toJSON();
            expect(json).toEqual(result.getResults());
            expect(typeof json).toBe("object");
            expect(json.isLowercase).toBe(true);
            expect(json.isConsecutive).toBe(true);
        });
        test("JSON.stringify() 應該正確序列化", () => {
            const result = detector.detect("qwe");
            const jsonString = JSON.stringify(result);
            const parsed = JSON.parse(jsonString);
            expect(parsed.isQwerty).toBe(true);
            expect(parsed.isConsecutive).toBe(true);
        });
    });
    describe("方法鏈", () => {
        test("detect() 應該返回 this 以支援方法鏈", () => {
            const detector = (0, index_1.useQwerty)(3);
            const result = detector.detect("abc");
            expect(result).toBe(detector);
            expect(result.isLowercase()).toBe(true);
            expect(result.isConsecutive()).toBe(true);
        });
        test("應該支援連續的方法調用", () => {
            const detector = (0, index_1.useQwerty)(3);
            expect(detector.detect("123").isNumber()).toBe(true);
            expect(detector.detect("qwe").isQwerty()).toBe(true);
            expect(detector.detect("ABC").isUppercase()).toBe(true);
        });
    });
    describe("複合檢測", () => {
        test("單一字串不應該同時匹配多種類型", () => {
            const detector = (0, index_1.useQwerty)(3);
            const qwertyResult = detector.detect("qwe");
            expect(qwertyResult.isQwerty()).toBe(true);
            expect(qwertyResult.isUppercase()).toBe(false);
            expect(qwertyResult.isNumber()).toBe(false);
            const numberResult = detector.detect("123");
            expect(numberResult.isNumber()).toBe(true);
            expect(numberResult.isQwerty()).toBe(false);
            expect(numberResult.isLowercase()).toBe(false);
        });
    });
    describe("table 導出", () => {
        test("應該導出正確的鍵盤配置表", () => {
            expect(index_1.table).toHaveProperty("qwerty");
            expect(index_1.table).toHaveProperty("uppercase");
            expect(index_1.table).toHaveProperty("lowercase");
            expect(index_1.table).toHaveProperty("number");
            expect(index_1.table.qwerty).toEqual(["qwertyuiop", "asdfghjkl", "zxcvbnm"]);
            expect(index_1.table.number).toEqual(["0123456789"]);
            expect(index_1.table.uppercase).toEqual(["ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
            expect(index_1.table.lowercase).toEqual(["abcdefghijklmnopqrstuvwxyz"]);
        });
    });
});
