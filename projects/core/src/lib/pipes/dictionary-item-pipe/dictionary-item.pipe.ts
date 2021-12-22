import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from '../../utils/dictionary.util';

@Pipe({
    name: 'dictionaryItem',
})
export class DictionaryItemPipe implements PipeTransform {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transform(key: any, dictionary: Dictionary<any, any>): string {
        return dictionary.get(key)?.value;
    }

}
