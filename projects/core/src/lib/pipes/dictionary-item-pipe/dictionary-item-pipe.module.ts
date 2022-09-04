import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DictionaryItemPipe } from './dictionary-item.pipe';

@NgModule({
    declarations: [ DictionaryItemPipe ],
    imports: [
        CommonModule,
    ],
    exports: [
        DictionaryItemPipe,
    ],
})
export class DictionaryItemPipeModule {
}
