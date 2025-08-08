export const table = {
  qwerty: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
  uppercase: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  lowercase: ["abcdefghijklmnopqrstuvwxyz"],
  number: ["0123456789"],
  symbol: ["`~!@#$%^&*()_+-[]\\;',./\""],
};

const detector = {
  inRow(
    str: string,
    tableName: keyof typeof table,
    incluedReversed: boolean = false
  ) {
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
  qwerty(str: string, incluedReversed: boolean = false) {
    return this.inRow(str, "qwerty", incluedReversed);
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
 */
class QwertyDetector {
  public results: DetectResult;
  private length: number;

  constructor(length: number) {
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
  detect(str: string | number, incluedReversed: boolean = false) {
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

    if (detector.qwerty(str, incluedReversed)) {
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
    ].some((value: boolean) => value);

    return this;
  }

  /**
   * 獲取總結果
   * @returns 是否為鍵盤連續字
   */
  isConsecutive(): boolean {
    return this.results.isConsecutive;
  }

  isQwerty(): boolean {
    return this.results.isQwerty;
  }

  isUppercase(): boolean {
    return this.results.isUppercase;
  }

  isLowercase(): boolean {
    return this.results.isLowercase;
  }

  isNumber(): boolean {
    return this.results.isNumber;
  }

  getResults(): DetectResult {
    return this.results;
  }

  /**
   * 字符串轉型方法
   * @returns 檢測結果的字符串表示
   */
  toString(): string {
    return this.results.isConsecutive.toString();
  }

  /**
   * 數值轉型方法
   * @returns 檢測結果的數值表示 (1 為 true, 0 為 false)
   */
  valueOf(): number {
    return this.results.isConsecutive ? 1 : 0;
  }

  /**
   * JSON 序列化方法
   * @returns 檢測結果對象
   */
  toJSON(): DetectResult {
    return this.results;
  }
}

/**
 * 判斷是否為鍵盤連續字
 * @param length 檢測的最小長度
 * @returns 檢測器實例
 */
export function useQwerty(length: number) {
  return new QwertyDetector(length);
}
