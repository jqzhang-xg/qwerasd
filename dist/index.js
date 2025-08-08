"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isLowercase = exports.isUppercase = exports.isQwerty = exports.table = void 0;
exports.useQwerty = useQwerty;
exports.table = {
    qwerty: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
    uppercase: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    lowercase: ["abcdefghijklmnopqrstuvwxyz"],
    number: ["0123456789"],
    symbol: ["`~!@#$%^&*()_+-[]\\;',./\""],
};
const detector = {
    inRow(str, tableName, incluedReversed = false) {
        for (const row of exports.table[tableName]) {
            if (row.includes(str)) {
                return true;
            }
            if (incluedReversed) {
                if (row.includes(str.split("").reverse().join(""))) {
                    return true;
                }
            }
        }
        return false;
    },
    inColumn(str, tableName, incluedReversed = false) {
        var _a;
        let columns = {};
        let combined = "";
        for (const row of exports.table[tableName]) {
            for (const [index, char] of row.split("").entries()) {
                columns[index] = ((_a = columns[index]) !== null && _a !== void 0 ? _a : "") + char;
            }
        }
        combined = Object.values(columns).join("");
        if (combined.includes(str)) {
            return true;
        }
        if (incluedReversed) {
            if (combined.includes(str.split("").reverse().join(""))) {
                return true;
            }
        }
        return false;
    },
    qwerty(str, incluedReversed = false, includeVertical = false) {
        const rowResult = this.inRow(str, "qwerty", incluedReversed);
        if (includeVertical) {
            const columnResult = this.inColumn(str, "qwerty", incluedReversed);
            return rowResult || columnResult;
        }
        return rowResult;
    },
    uppercase(str, incluedReversed = false) {
        return this.inRow(str, "uppercase", incluedReversed);
    },
    lowercase(str, incluedReversed = false) {
        return this.inRow(str, "lowercase", incluedReversed);
    },
    number(str, incluedReversed = false) {
        return this.inRow(str, "number", incluedReversed);
    },
};
/**
 * 判斷是否為 QWERTY 鍵盤連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @param includeVertical 是否包含垂直檢查
 * @returns 是否為 QWERTY 鍵盤連續字
 */
const isQwerty = (str, incluedReversed = false, includeVertical = false) => {
    return detector.qwerty(str, incluedReversed, includeVertical);
};
exports.isQwerty = isQwerty;
/**
 * 判斷是否為大寫字母連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為大寫字母連續字
 */
const isUppercase = (str, incluedReversed = false) => {
    return detector.uppercase(str, incluedReversed);
};
exports.isUppercase = isUppercase;
/**
 * 判斷是否為小寫字母連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為小寫字母連續字
 */
const isLowercase = (str, incluedReversed = false) => {
    return detector.lowercase(str, incluedReversed);
};
exports.isLowercase = isLowercase;
/**
 * 判斷是否為數字連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為數字連續字
 */
const isNumber = (str, incluedReversed = false) => {
    return detector.number(str, incluedReversed);
};
exports.isNumber = isNumber;
/**
 * 鍵盤連續字檢測器
 */
class QwertyDetector {
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
        if (detector.qwerty(str, incluedReversed, includeVertical)) {
            this.results.isQwerty = true;
        }
        if (detector.uppercase(str, incluedReversed)) {
            this.results.isUppercase = true;
        }
        if (detector.lowercase(str, incluedReversed)) {
            this.results.isLowercase = true;
        }
        if (detector.number(str, incluedReversed)) {
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
    isQwerty() {
        return this.results.isQwerty;
    }
    isUppercase() {
        return this.results.isUppercase;
    }
    isLowercase() {
        return this.results.isLowercase;
    }
    isNumber() {
        return this.results.isNumber;
    }
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
