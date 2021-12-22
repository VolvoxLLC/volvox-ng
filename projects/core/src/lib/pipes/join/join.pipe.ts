import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {

    /**
     * Join array by separator
     * @param array
     * @param returnField
     * @param separator
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transform(array: any[], returnField: any, separator: string = ', '): string {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return array.map((val: any): string => returnField ? val[ returnField ] : val).join(separator);
    }

}
