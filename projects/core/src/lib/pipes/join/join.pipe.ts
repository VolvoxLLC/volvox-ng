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
    public transform(array: any[], returnField: any, separator: string = ', '): string {
        return array.map((val: any): string => returnField ? val[ returnField ] : val).join(separator);
    }

}
