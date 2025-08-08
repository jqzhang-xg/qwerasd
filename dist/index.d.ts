/**
 * 鍵盤字符表
 */
export declare const table: {
    /**
     * QWERTY 鍵盤字符表
     */
    qwerty: string[];
    /**
     * 大寫字母字符表
     */
    uppercase: string[];
    /**
     * 小寫字母字符表
     */
    lowercase: string[];
    /**
     * 數字字符表
     */
    number: string[];
    /**
     * 符號字符表
     */
    symbol: string[];
};
declare const detector: {
    inRow(str: string, tableName: keyof typeof table, incluedReversed?: boolean): boolean;
    inColumn(str: string, tableName: keyof typeof table, incluedReversed?: boolean): boolean;
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
/**
 * 檢測結果類型
 */
export interface DetectResult {
    /** 是否為 QWERTY 鍵盤連續字 */
    isQwerty: boolean;
    /** 是否為大寫字母連續字 */
    isUppercase: boolean;
    /** 是否為小寫字母連續字 */
    isLowercase: boolean;
    /** 是否為數字連續字 */
    isNumber: boolean;
    /** 總結果，任一檢測為 true 時為 true */
    isConsecutive: boolean;
}
/**
 * 鍵盤連續字檢測器
 * @param length 檢測的最小長度
 */
declare class QwertyDetector {
    results: DetectResult;
    private length;
    /**
     * 鍵盤連續字檢測器
     * @param length 檢測的最小長度
     */
    constructor(length: number);
    /**
     * 判斷是否為鍵盤連續字
     * @param str 字串
     * @param incluedReversed 是否包含反向檢查
     * @returns 檢測結果對象
     */
    detect(str: string | number, incluedReversed?: boolean, includeVertical?: boolean): this;
    /**
     * 獲取總結果
     * @returns 是否為鍵盤連續字
     */
    isConsecutive(): boolean;
    /**
     * 判斷是否為 QWERTY 鍵盤連續字
     * @returns 是否為 QWERTY 鍵盤連續字
     */
    isQwerty(): boolean;
    /**
     * 判斷是否為大寫字母連續字
     * @returns 是否為大寫字母連續字
     */
    isUppercase(): boolean;
    /**
     * 判斷是否為小寫字母連續字
     * @returns 是否為小寫字母連續字
     */
    isLowercase(): boolean;
    /**
     * 判斷是否為數字連續字
     * @returns 是否為數字連續字
     */
    isNumber(): boolean;
    /**
     * 獲取檢測結果
     * @returns 檢測結果
     */
    getResults(): DetectResult;
    /**
     * 字符串轉型方法
     * @returns 檢測結果的字符串表示
     */
    toString(): string;
    /**
     * 數值轉型方法
     * @returns 檢測結果的數值表示 (1 為 true, 0 為 false)
     */
    valueOf(): number;
    /**
     * JSON 序列化方法
     * @returns 檢測結果對象
     */
    toJSON(): DetectResult;
}
/**
 * 判斷是否為鍵盤連續字
 * @param length 檢測的最小長度
 * @returns 檢測器實例
 */
export declare function useQwerty(length: number): QwertyDetector;
export {};
