export type QwerType = "qwerty" | "uppercase" | "lowercase" | "number" | "symbol";
export type QwerKey = QwerType | (string & {});
/**
 * 鍵盤字符表
 */
export declare const table: Record<QwerType, string[]>;
declare const detector: {
    inRow(str: string, tableName: QwerType, incluedReversed?: boolean): boolean;
    inColumn(str: string, tableName: QwerType, incluedReversed?: boolean): boolean;
    qwerty(str: string, incluedReversed?: boolean, includeVertical?: boolean): boolean;
    uppercase(str: string, incluedReversed?: boolean): boolean;
    lowercase(str: string, incluedReversed?: boolean): boolean;
    number(str: string, incluedReversed?: boolean): boolean;
};
/**
 * 判斷是否為 QWERTY 鍵盤連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @param includeVertical 是否包含垂直檢查
 * @returns 是否為 QWERTY 鍵盤連續字
 */
export declare const isQwerty: typeof detector.qwerty;
/**
 * 判斷是否為大寫字母連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為大寫字母連續字
 */
export declare const isUppercase: typeof detector.uppercase;
/**
 * 判斷是否為小寫字母連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為小寫字母連續字
 */
export declare const isLowercase: typeof detector.lowercase;
/**
 * 判斷是否為數字連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為數字連續字
 */
export declare const isNumber: typeof detector.number;
export {};
