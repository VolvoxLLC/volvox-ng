import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUpdateConfig, UpdateDialogResult } from '../../../models/update-config.model';
import { BaseComponent } from '../../base/base.component';

@Component({
    selector: 'volvox-mat-update-dialog',
    templateUrl: './mat-update.dialog.html',
    styleUrls: [ './mat-update.dialog.scss' ],
})
export class MatUpdateDialog extends BaseComponent implements OnInit {

    constructor(
        private readonly myMatDialogRef: MatDialogRef<MatUpdateDialog>,
        @Inject(MAT_DIALOG_DATA) public readonly config: IUpdateConfig,
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public close(result: UpdateDialogResult): void {
        this.myMatDialogRef.close(result);
    }

}
