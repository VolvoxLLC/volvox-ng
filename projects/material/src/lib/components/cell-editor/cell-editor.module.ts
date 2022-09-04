import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CellEditorComponent } from './cell-editor.component';

@NgModule({
    declarations: [ CellEditorComponent ],
    imports: [
        CommonModule,
    ],
    exports: [
        CellEditorComponent,
    ],
})
export class CellEditorModule {
}
