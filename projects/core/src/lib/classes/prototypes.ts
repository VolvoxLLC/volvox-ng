/**
 * Cast any type to string
 * @param str string to be casted
 * @returns casted string
 */
export function string(str: any): string {
    return str as string;
}

export class StringExtensions implements IStringExtensions {

    /**
     * Gets a part of a string
     * @param maxChars maximum amount of chars
     * @param appendDot append three dots at the end
     * @returns splitted string
     */
    public getPart(maxChars: number, appendDot?: boolean): string {
        let newStr = string(this).replace(/\\n/g, ' ');
        if (newStr.length > maxChars) {
            newStr = newStr.substring(0, maxChars);
            if (appendDot && newStr.length > maxChars - 3) {
                newStr += '...';
            }
        }
        return newStr;
    }

    /**
     * Converts a string from json
     * @returns object of expected type
     */
    public fromJSON<T>(): T {
        let str: string = string(this);
        if (typeof this !== 'string') {
            str = JSON.stringify(str);
        }

        try {
            str = JSON.parse(str);
        } catch (e) {
            return null;
        }

        if (typeof str === 'object') {
            return <T>str;
        }
    }

    /**
     * Converts a string to a css class
     * @returns converted kebab case css class
     */
    public toCSSClass(): string {
        return string(this)?.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
    }

    /**
     * Converts a datetime string to utc format
     */
    public toUTC(): string {
        return string(this) + 'Z';
    }
}

export class ArrayExtensions implements IArrayExtensions {

    /**
     * Checks if array has changes
     * @param data array passed
     * @deprecated learn how to program
     */
    public hasChanges<T>(data: T): boolean {
        return JSON.stringify(this) !== JSON.stringify(data);
    }

}

/**
 * @interface StringExtensions
 */
export interface IStringExtensions {
    getPart: (maxChars: number, appendDot?: boolean) => string;
    fromJSON: <T>() => T;
    toCSSClass: () => string;
    toUTC: () => string;
}

export interface IArrayExtensions {
    /**
     * Checks if the array is equal to the other one
     * @param data array
     * @deprecated learn how to program
     */
    hasChanges: <T>(data: T[]) => boolean;
}

declare global {
    // tslint:disable-next-line:no-empty-interface
    interface String extends IStringExtensions {
    }

    // tslint:disable-next-line:no-empty-interface
    interface Array<T> extends IArrayExtensions {
    }
}

export class Prototypes {

    /**
     * Initialize prototypes
     */
    public static init(): void {
        const stringExtensions = new StringExtensions();
        const arrayExtensions = new ArrayExtensions();

        String.prototype.getPart = stringExtensions.getPart;
        String.prototype.fromJSON = stringExtensions.fromJSON;
        String.prototype.toCSSClass = stringExtensions.toCSSClass;
        String.prototype.toUTC = stringExtensions.toUTC;

        Array.prototype.hasChanges = arrayExtensions.hasChanges;
    }
}
