import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findInArray',
})
export class FindInArrayPipe implements PipeTransform {

    /**
     * Find an element in an array
     * @param array
     * @param search
     * @param searchValue
     * @param returnElements
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transform(array: any[], search: any, searchValue: any, returnElements?: string[]): any {
        // Return if array is empty or null
        if (!array || !array.length) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundItem: any = array.find((val: string): boolean => (search ? val[ search ] : val) === searchValue);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any[] = [];
        for (const returnElement of returnElements) {
            result.push(foundItem[ returnElement ]);
        }

        return result;
    }

}
