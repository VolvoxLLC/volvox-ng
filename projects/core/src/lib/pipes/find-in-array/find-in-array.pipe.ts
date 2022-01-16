import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findInArray',
})
export class FindInArrayPipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transform<T>(searchValue: any, array: T[], searchKey: keyof T, returnElements?: (keyof T)[]): any {
        // Return if array is empty or null
        if (!array || !array.length) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundItem: T = array.find((val: T): boolean => (searchKey ? val[ searchKey as any ] : val) === searchValue);
        if (!foundItem) {
            return null;
        }

        // Return whole item
        if (!returnElements) {
            return foundItem;
        }

        if (returnElements.length === 1) {
            return foundItem[ returnElements[ 0 ] ];
        }

        // Return given values to the keys
        return returnElements.map((val: keyof T) => foundItem[ val as string ]);
    }

}
