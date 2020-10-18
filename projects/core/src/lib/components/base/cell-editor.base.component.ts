import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogData, ConfirmDialogResult } from '../../models/confirm-dialog.model';
import { TableItem } from '../../models/table-item.model';
import { PromiseReject, PromiseResolve } from '../../models/utils.model';
import { CellEditorBaseFacade } from '../../services/facades/cell-editor-base.facade';
import { ConfirmDialog } from '../confirm-dialog/confirm.dialog';
import { BaseComponent } from './base.component';

@Component({
    selector: 'volvox-cell-editor-base',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellEditorBaseComponent<Model> extends BaseComponent implements OnInit, CanDeactivate<CellEditorBaseComponent<Model>> {

    constructor(
        public readonly myCellEditorFacade: CellEditorBaseFacade<Model>,
        public readonly myMatDialog: MatDialog,
    ) {
        super();
    }

    public get changedRows(): TableItem<Model>[] {
        return this.myCellEditorFacade.snapshot.dataSource?.data?.filter((c: TableItem<Model>): boolean => c.rowChangedRowKeys?.length > 0);
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public canDeactivate(component: CellEditorBaseComponent<Model>, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                         nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.changedRows.length) {
            return true;
        }

        return new Promise((resolve: PromiseResolve<boolean>, reject: PromiseReject): void => {
            this.myMatDialog
                .open(ConfirmDialog, {
                    width: '600px',
                    data: new ConfirmDialogData('Discard changes?', 'Do you really want to discard your changes?'),
                })
                .afterClosed()
                .subscribe((result: ConfirmDialogResult): void => {
                    if (result === ConfirmDialogResult.confirmed) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

}
