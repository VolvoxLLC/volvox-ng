/**
 * Checks if an object is null or undefined. Does not check for
 * empty strings, or false booleans
 * @param val
 */
export function isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
}

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
