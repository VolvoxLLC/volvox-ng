import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from '../../utils/dictionary.util';

@Pipe({
    name: 'dictionaryItem',
})
export class DictionaryItemPipe implements PipeTransform {

    public transform(key: any, dictionary: Dictionary<any, any>): string {
        return dictionary.get(key)?.value;
    }

}
