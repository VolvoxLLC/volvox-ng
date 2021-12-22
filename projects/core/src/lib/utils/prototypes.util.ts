/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cast any type
 * @param data to be casted
 * @returns casted data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any,max-classes-per-file
export function cast<T>(data: any): T {
    return data as T;
}

export class StringExtensions implements IStringExtensions {
    public getPart(maxChars: number, appendDot?: boolean): string {
        let newStr = cast<string>(this).replace(/\\n/g, ' ');
        if (newStr.length > maxChars) {
            newStr = newStr.substring(0, maxChars);
            if (appendDot && newStr.length > maxChars - 3) {
                newStr += '...';
            }
        }
        return newStr;
    }

    public fromJSON<T>(): T {
        let str: string = cast<string>(this);
        if (typeof this !== 'string') {
            str = JSON.stringify(str);
        }

        try {
            str = JSON.parse(str);
        } catch (e) {
            return null;
        }

        if (typeof str === 'object') {
            return str as T;
        }
    }

    public toCSSClass(): string {
        return cast<string>(this)?.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
    }

    public toUTC(): string {
        return `${cast<string>(this)}Z`;
    }
}

export class ArrayExtensions implements IArrayExtensions {
    public hasChanges<T>(data: T[]): boolean {
        return JSON.stringify(this) !== JSON.stringify(data);
    }

    public replaceRange<T>(data: T[], start: number, end: number): T[] {
        const array: T[] = cast<T[]>(this);
        let replaceDataIndex: number = 0;
        for (let i: number = start; i < end; i++) {
            if (!array[ i ] && !data[ replaceDataIndex ]) {
                array.splice(i, 1);
                continue;
            }

            array[ i ] = data[ replaceDataIndex ];
            replaceDataIndex++;
        }
        return array;
    }
}

export class NumberExtensions implements INumberExtensions {
    public between(start: number, end: number): boolean {
        const num: number = cast<number>(this);
        return num >= start && num <= end;
    }
}

/**
 * @interface StringExtensions
 */
export interface IStringExtensions {
    /**
     * Gets a part of a string
     * @param maxChars maximum amount of chars
     * @param appendDot append three dots at the end
     * @returns splitted string
     */
    getPart(maxChars: number, appendDot?: boolean): string;

    /**
     * Converts a string from json
     * @returns object of expected type
     */
    fromJSON<T>(): T;

    /**
     * Converts a string to a css class
     * @returns converted kebab case css class
     */
    toCSSClass(): string;

    /**
     * Converts a datetime string to utc format
     */
    toUTC(): string;
}

export interface IArrayExtensions {
    /**
     * Checks if array has changes
     * @param data array passed
     * @deprecated learn how to program
     */
    hasChanges: <T>(data: T[]) => boolean;
    /**
     * Replaces a specific element range in an array
     * @param data
     */
    replaceRange: <T>(replaceData: T[], start: number, end: number) => T[];
}

export interface INumberExtensions {
    /**
     * checks if a number in a range
     * @param start of range
     * @param end of range
     */
    between(start: number, end: number): boolean;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface,id-blacklist
    interface String extends IStringExtensions {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars
    interface Array<T> extends IArrayExtensions {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface,id-blacklist
    interface Number extends INumberExtensions {
    }
}

export class Prototypes {

    /**
     * Initialize prototypes
     */
    public static init(): void {
        const stringExtensions = new StringExtensions();
        const arrayExtensions = new ArrayExtensions();
        const numberExtensions = new NumberExtensions();

        String.prototype.getPart = stringExtensions.getPart;
        String.prototype.fromJSON = stringExtensions.fromJSON;
        String.prototype.toCSSClass = stringExtensions.toCSSClass;
        String.prototype.toUTC = stringExtensions.toUTC;

        Array.prototype.hasChanges = arrayExtensions.hasChanges;
        Array.prototype.replaceRange = arrayExtensions.replaceRange;

        Number.prototype.between = numberExtensions.between;
    }
}
