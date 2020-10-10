import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmDialogData, ConfirmDialogResult } from '../../models/confirm-dialog.model';
import { ICellEditorBaseState } from '../../models/states/cell-editor-base.state.model';
import { TableItem } from '../../models/table-item.model';
import { PromiseReject, PromiseResolve } from '../../models/utils.model';
import { ConfirmDialog } from '../confirm-dialog/confirm.dialog';
import { BaseComponent } from './base.component';

@Component({
    selector: 'volvox-cell-editor-base',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellEditorBaseComponent<T, T1> extends BaseComponent<ICellEditorBaseState<T1>>
    implements OnInit, CanDeactivate<CellEditorBaseComponent<T, T1>> {

    constructor(
        public readonly myMatDialog: MatDialog,
    ) {
        super();
        this.store$ = new BehaviorSubject<ICellEditorBaseState<T1>>({
            dataSource: new MatTableDataSource<TableItem<T1>>(),
            displayedColumns: [],
        });
    }

    public get changedRows(): TableItem<T1>[] {
        return this.snapshot.dataSource?.data?.filter((c: TableItem<T1>): boolean => c.rowChangedRowKeys?.length > 0);
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public canDeactivate(component: CellEditorBaseComponent<T, T1>, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                         nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.changedRows.length) {
            return true;
        }
        return new Promise((resolve: PromiseResolve<boolean>, reject: PromiseReject): void => {
            this.myMatDialog.open(ConfirmDialog, {
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
