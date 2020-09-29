export type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
export type PromiseReject = (reason?: any) => void;

export type Theme = 'light' | 'dark';

export type Browser = 'Chrome' | 'Firefox' | 'InternetExplorer' | 'Opera' | 'Edge' | 'Safari' | 'Other';

export type ContentPosition = 'top' | 'left' | 'bottom' | 'right';

export interface ISize {
    width: number;
    height: number;
}

export interface IItem {
    key: number;
    label: string;
}

export function isNullOrEmpty(str: string): boolean {
    return !str?.trim();
}

export function isZeroOrHigher(num: number | string): boolean {
    return +num >= 0;
}

export function isNumber(num: any): boolean {
    return !isNaN(num);
}
