import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogAction, ConfirmDialogData, ConfirmDialogResult } from '../../models/confirm-dialog.model';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'volvox-confirm-dialog',
    templateUrl: './confirm.dialog.html',
    styleUrls: ['./confirm.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog extends BaseComponent implements OnInit {

    public dialogData: ConfirmDialogData;
    public result: typeof ConfirmDialogResult = ConfirmDialogResult;

    constructor(
        @Inject(MAT_DIALOG_DATA) private myConfirmDialogData: ConfirmDialogData,
        private myMatDialogRef: MatDialogRef<ConfirmDialog>,
    ) {
        super();
        const cancel: ConfirmDialogAction = new ConfirmDialogAction('volvox.commons.buttons.cancel', true);
        const deny: ConfirmDialogAction = new ConfirmDialogAction('volvox.commons.buttons.deny');
        const confirm: ConfirmDialogAction = new ConfirmDialogAction('volvox.commons.buttons.confirm', true);
        const title: string = 'volvox.components.confirmDialog.title';
        const message: string = 'volvox.components.confirmDialog.message';

        this.dialogData = myConfirmDialogData || new ConfirmDialogData(title, message, cancel, confirm, deny);

        if (!this.dialogData.title) {
            this.dialogData.title = title;
        }

        if (!this.dialogData.message) {
            this.dialogData.message = message;
        }

        if (!this.dialogData.cancel) {
            this.dialogData.cancel = cancel;
        }

        if (!this.dialogData.confirm) {
            this.dialogData.confirm = confirm;
        }

        if (!this.dialogData.deny) {
            this.dialogData.deny = deny;
        }
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public confirm(result: ConfirmDialogResult): void {
        this.myMatDialogRef.close(result);
    }

}
