import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { CellEditorBaseComponent } from './cell-editor.base.component';

@NgModule({
    declarations: [
        BaseComponent,
        CellEditorBaseComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class BaseModule {
}
