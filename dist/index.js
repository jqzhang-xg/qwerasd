"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isLowercase = exports.isUppercase = exports.isQwerty = exports.table = void 0;
exports.useQwerty = useQwerty;
// 導入輔助功能
const utils_1 = require("./utils");
Object.defineProperty(exports, "table", { enumerable: true, get: function () { return utils_1.table; } });
Object.defineProperty(exports, "isQwerty", { enumerable: true, get: function () { return utils_1.isQwerty; } });
Object.defineProperty(exports, "isUppercase", { enumerable: true, get: function () { return utils_1.isUppercase; } });
Object.defineProperty(exports, "isLowercase", { enumerable: true, get: function () { return utils_1.isLowercase; } });
Object.defineProperty(exports, "isNumber", { enumerable: true, get: function () { return utils_1.isNumber; } });
/**
 * 鍵盤連續字檢測器
 * @param length 檢測的最小長度
 */
class QwertyDetector {
    /**
     * 鍵盤連續字檢測器
     * @param length 檢測的最小長度
     */
    constructor(length) {
        this.length = length;
        this.results = {
            isQwerty: false,
            isUppercase: false,
            isLowercase: false,
            isNumber: false,
            isConsecutive: false,
        };
    }
    /**
     * 判斷是否為鍵盤連續字
     * @param str 字串
     * @param incluedReversed 是否包含反向檢查
     * @returns 檢測結果對象
     */
    detect(str, incluedReversed = false, includeVertical = false) {
        // 重置結果
        this.results = {
            isQwerty: false,
            isUppercase: false,
            isLowercase: false,
            isNumber: false,
            isConsecutive: false,
        };
        if (typeof str !== "string" && typeof str !== "number") {
            throw new Error("str must be a string or number");
        }
        if (typeof str === "number") {
            str = str.toString();
        }
        if (str.length < this.length) {
            return this;
        }
        if ((0, utils_1.isQwerty)(str, incluedReversed, includeVertical)) {
            this.results.isQwerty = true;
        }
        if ((0, utils_1.isUppercase)(str, incluedReversed)) {
            this.results.isUppercase = true;
        }
        if ((0, utils_1.isLowercase)(str, incluedReversed)) {
            this.results.isLowercase = true;
        }
        if ((0, utils_1.isNumber)(str, incluedReversed)) {
            this.results.isNumber = true;
        }
        // 設定總結果
        this.results.isConsecutive = [
            this.results.isQwerty,
            this.results.isUppercase,
            this.results.isLowercase,
            this.results.isNumber,
        ].some((value) => value);
        return this;
    }
    /**
     * 獲取總結果
     * @returns 是否為鍵盤連續字
     */
    isConsecutive() {
        return this.results.isConsecutive;
    }
    /**
     * 判斷是否為 QWERTY 鍵盤連續字
     * @returns 是否為 QWERTY 鍵盤連續字
     */
    isQwerty() {
        return this.results.isQwerty;
    }
    /**
     * 判斷是否為大寫字母連續字
     * @returns 是否為大寫字母連續字
     */
    isUppercase() {
        return this.results.isUppercase;
    }
    /**
     * 判斷是否為小寫字母連續字
     * @returns 是否為小寫字母連續字
     */
    isLowercase() {
        return this.results.isLowercase;
    }
    /**
     * 判斷是否為數字連續字
     * @returns 是否為數字連續字
     */
    isNumber() {
        return this.results.isNumber;
    }
    /**
     * 獲取檢測結果
     * @returns 檢測結果
     */
    getResults() {
        return this.results;
    }
    /**
     * 字符串轉型方法
     * @returns 檢測結果的字符串表示
     */
    toString() {
        return this.results.isConsecutive.toString();
    }
    /**
     * 數值轉型方法
     * @returns 檢測結果的數值表示 (1 為 true, 0 為 false)
     */
    valueOf() {
        return this.results.isConsecutive ? 1 : 0;
    }
    /**
     * JSON 序列化方法
     * @returns 檢測結果對象
     */
    toJSON() {
        return this.results;
    }
}
/**
 * 判斷是否為鍵盤連續字
 * @param length 檢測的最小長度
 * @returns 檢測器實例
 */
function useQwerty(length) {
    return new QwertyDetector(length);
}
