import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialog } from './confirm.dialog';

@NgModule({
    declarations: [ConfirmDialog],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
    ],
    exports: [],
})
export class ConfirmDialogModule {
}
