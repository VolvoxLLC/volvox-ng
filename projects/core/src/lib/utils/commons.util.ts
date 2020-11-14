export function isNullOrEmpty(str: string): boolean {
    return !str?.trim();
}

export function isZeroOrHigher(num: number | string): boolean {
    return num !== null && +num >= 0;
}

export function isNumber(num: any): boolean {
    return num !== null && !isNaN(+num);
}
