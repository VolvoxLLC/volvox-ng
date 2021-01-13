import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '@volvox-ng/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICellEditorBaseState } from '../../models/states/cell-editor-base-state.model';
import { TableItem } from '../../models/table-item.model';

let _state: ICellEditorBaseState<any> = {
    loading: false,
    dataSource: new MatTableDataSource<TableItem<any>>(),
    displayedColumns: [],
};

@Injectable({
    providedIn: 'root',
})
export class CellEditorBaseFacade<Model> {

    protected store$: BehaviorSubject<ICellEditorBaseState<Model>>;

    constructor(
        private readonly myApiService: ApiService,
    ) {
        this.store$ = new BehaviorSubject<ICellEditorBaseState<Model>>(_state);
    }

    public loadData(url: string): Observable<TableItem<Model>[]> {
        this.updateState({ ..._state, dataSource: new MatTableDataSource<TableItem<Model>>(), loading: true });
        return this.myApiService.get<TableItem<Model>[]>(url)
            .pipe(
                tap((data: TableItem<Model>[]): void => {
                    const state: ICellEditorBaseState<Model> = { ...this.snapshot };
                    state.dataSource.data = data;
                    this.updateState({ ..._state, dataSource: state.dataSource, loading: false });
                })
            );
    }

    public updateDataSourceSort(sort: MatSort): void {
        const state: ICellEditorBaseState<Model> = { ...this.snapshot };
        state.dataSource.sort = sort;
        this.updateState({ ..._state, dataSource: state.dataSource });
    }

    public updateDataSourceFilter(filter: string): void {
        const state: ICellEditorBaseState<Model> = { ...this.snapshot };
        state.dataSource.filter = filter;
        this.updateState({ ..._state, dataSource: state.dataSource });
    }

    public updateDataSourcePaginator(paginator: MatPaginator): void {
        const state: ICellEditorBaseState<Model> = { ...this.snapshot };
        state.dataSource.paginator = paginator;
        this.updateState({ ..._state, dataSource: state.dataSource });
    }

    public get snapshot(): ICellEditorBaseState<Model> {
        return this.store$.value;
    }

    public subState(): Observable<ICellEditorBaseState<Model>> {
        return this.store$.asObservable();
    }

    public updateDisplayedColumns(displayedColumns: string[]): void {
        this.updateState({ ..._state, displayedColumns });
    }

    private updateState(state: ICellEditorBaseState<Model>): void {
        this.store$.next(_state = state);
    }

}
