"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isLowercase = exports.isUppercase = exports.isQwerty = exports.table = void 0;
/**
 * 鍵盤字符表
 */
exports.table = {
    /**
     * QWERTY 鍵盤字符表
     */
    qwerty: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
    /**
     * 大寫字母字符表
     */
    uppercase: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    /**
     * 小寫字母字符表
     */
    lowercase: ["abcdefghijklmnopqrstuvwxyz"],
    /**
     * 數字字符表
     */
    number: ["0123456789"],
    /**
     * 符號字符表
     */
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
