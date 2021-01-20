import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { VolvoxDurationPipeModule } from '@volvox-ng/core';
import { MatUpdateDialog } from './mat-update-dialog/mat-update.dialog';
import { UpdateDialog } from './update.dialog';

@NgModule({
    declarations: [ UpdateDialog, MatUpdateDialog ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        VolvoxDurationPipeModule,
        TranslateModule,
    ],
    exports: [ UpdateDialog ],
})
export class UpdateDialogModule {
}
