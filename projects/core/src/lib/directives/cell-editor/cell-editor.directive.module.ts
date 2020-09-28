import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CellEditorDirective } from './cell-editor.directive';

@NgModule({
    declarations: [CellEditorDirective],
    imports: [
        CommonModule,
    ],
    exports: [
        CellEditorDirective,
    ],
})
export class CellEditorDirectiveModule {
}
