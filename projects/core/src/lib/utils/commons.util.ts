import { ITransformMatrix } from '../models/transform-matrix.model';

/**
 * Checks if an object is null or undefined. Does not check for
 * empty strings, or false booleans
 * @param val
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(num: any): boolean {
    return num !== null && !isNaN(+num);
}

/**
 * Round to nearest number given
 * @param value
 * @param round
 */
export function roundNearest(value: number): number {
    return Math.ceil(value / 5) * 5;
}

/**
 * Merge a two dimensional array
 * @param array
 */
export function mergeArray<T>(array: T[][]): T[] {
    return array.reduce((flat: T[], toFlatten: T[] | T[][]): T[] =>
        flat.concat(Array.isArray(toFlatten) ? mergeArray<T>(toFlatten as T[][]) : toFlatten), []);
}

/**
 * Get CSS Transform matrix from an element
 * @param element
 */
export function getTransformMatrix(element: HTMLElement): ITransformMatrix {
    const values = element.style.transform.split(/\w+\(|\);?/);
    const transform = values[ 1 ].split(/,\s?/g).map((numStr: string): number => parseInt(numStr, 10));

    return {
        x: transform[ 0 ],
        y: transform[ 1 ],
        z: transform[ 2 ],
    };
}
