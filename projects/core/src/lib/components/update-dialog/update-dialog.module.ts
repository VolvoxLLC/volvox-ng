import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { VolvoxDurationPipeModule } from '../../pipes/volvox-duration-pipe/volvox-duration-pipe.module';
import { MatUpdateDialog } from './mat-update-dialog/mat-update.dialog';
import { UpdateDialog } from './update.dialog';
import { TranslateModule } from '@ngx-translate/core';

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
