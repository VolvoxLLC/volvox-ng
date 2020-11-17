/**
 * Checks if a string is null or empty
 * @param str
 */
export function isNullOrEmpty(str: string): boolean {
    return !str?.trim();
}

/**
 * Checks if a string or number is zero or higher
 * @param num
 */
export function isZeroOrHigher(num: number | string): boolean {
    return num !== null && +num >= 0;
}

/**
 * Checks if an object is a number
 * @param num
 */
export function isNumber(num: any): boolean {
    return num !== null && !isNaN(+num);
}
