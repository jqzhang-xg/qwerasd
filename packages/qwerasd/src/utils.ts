export type QwerType =
  | "qwerty"
  | "uppercase"
  | "lowercase"
  | "number"
  | "symbol";

export type QwerKey = QwerType | (string & {});

/**
 * 鍵盤字符表
 */
export const table: Record<QwerType, string[]> = {
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
  inRow(str: string, tableName: QwerType, incluedReversed: boolean = false) {
    for (const row of table[tableName]) {
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
  inColumn(str: string, tableName: QwerType, incluedReversed: boolean = false) {
    let columns: { [key: number]: string } = {};
    let combined = "";

    for (const row of table[tableName]) {
      for (const [index, char] of row.split("").entries()) {
        columns[index] = (columns[index] ?? "") + char;
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
  qwerty(
    str: string,
    incluedReversed: boolean = false,
    includeVertical: boolean = false
  ) {
    const rowResult = this.inRow(str, "qwerty", incluedReversed);

    if (includeVertical) {
      const columnResult = this.inColumn(str, "qwerty", incluedReversed);
      return rowResult || columnResult;
    }

    return rowResult;
  },
  uppercase(str: string, incluedReversed: boolean = false) {
    return this.inRow(str, "uppercase", incluedReversed);
  },
  lowercase(str: string, incluedReversed: boolean = false) {
    return this.inRow(str, "lowercase", incluedReversed);
  },
  number(str: string, incluedReversed: boolean = false) {
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
export const isQwerty: typeof detector.qwerty = (
  str: string,
  incluedReversed: boolean = false,
  includeVertical: boolean = false
) => {
  return detector.qwerty(str, incluedReversed, includeVertical);
};

/**
 * 判斷是否為大寫字母連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為大寫字母連續字
 */
export const isUppercase: typeof detector.uppercase = (
  str: string,
  incluedReversed: boolean = false
) => {
  return detector.uppercase(str, incluedReversed);
};

/**
 * 判斷是否為小寫字母連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為小寫字母連續字
 */
export const isLowercase: typeof detector.lowercase = (
  str: string,
  incluedReversed: boolean = false
) => {
  return detector.lowercase(str, incluedReversed);
};

/**
 * 判斷是否為數字連續字
 * @param str 字串
 * @param incluedReversed 是否包含反向檢查
 * @returns 是否為數字連續字
 */
export const isNumber: typeof detector.number = (
  str: string,
  incluedReversed: boolean = false
) => {
  return detector.number(str, incluedReversed);
};
