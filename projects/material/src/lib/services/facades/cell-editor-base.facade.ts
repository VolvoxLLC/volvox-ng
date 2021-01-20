import { Injectable } from '@angular/core';
import { ApiService } from '@volvox-ng/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICellEditorBaseState } from '../../models/states/cell-editor-base-state.model';
import { TableItem } from '../../models/table-item.model';

let _state: ICellEditorBaseState = {
    loading: false,
};

@Injectable({
    providedIn: 'root',
})
export class CellEditorBaseFacade<Model> {

    protected store$: BehaviorSubject<ICellEditorBaseState>;

    constructor(
        private readonly myApiService: ApiService,
    ) {
        this.store$ = new BehaviorSubject<ICellEditorBaseState>(_state);
    }

    public loadData(url: string): Observable<TableItem<Model>[]> {
        this.updateState({ ..._state, loading: true });
        return this.myApiService.get<TableItem<Model>[]>(url)
            .pipe(
                tap((data: TableItem<Model>[]): void => {
                    const state: ICellEditorBaseState = { ...this.snapshot };
                    this.updateState({ ..._state, loading: false });
                })
            );
    }

    public get snapshot(): ICellEditorBaseState {
        return this.store$.value;
    }

    public subState(): Observable<ICellEditorBaseState> {
        return this.store$.asObservable();
    }

    private updateState(state: ICellEditorBaseState): void {
        this.store$.next(_state = state);
    }

}
