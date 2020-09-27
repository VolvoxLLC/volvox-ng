﻿import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogData, ConfirmDialogResult } from '../../models/confirm-dialog-data.model';
import { TableItem } from '../../models/table-item.model';
import { PromiseReject, PromiseResolve } from '../../models/utils.model';
import { ConfirmDialog } from '../confirm-dialog/confirm.dialog';
import { BaseComponent } from './base.component';

@Component({
    selector: 'apollo-cell-editor-base',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellEditorBaseComponent<T> extends BaseComponent implements OnInit, CanDeactivate<CellEditorBaseComponent<T>> {

    public displayedColumns: string[];
    public dataSource: MatTableDataSource<TableItem<T>>;

    constructor(
        public readonly myMatDialog: MatDialog,
    ) {
        super();
    }

    public get changedRows(): TableItem<T>[] {
        return this.dataSource?.data?.filter((c: TableItem<T>): boolean => c.rowChangedRowKeys?.length > 0);
    }

    public ngOnInit(): void {
        this.dataSource = new MatTableDataSource<TableItem<T>>();
    }

    public canDeactivate(component: CellEditorBaseComponent<T>, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
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
