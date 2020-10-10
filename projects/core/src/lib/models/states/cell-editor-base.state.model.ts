import { MatTableDataSource } from '@angular/material/table';
import { TableItem } from '../table-item.model';

export interface ICellEditorBaseState<T> {
    displayedColumns: string[];
    dataSource: MatTableDataSource<TableItem<T>>;
}

export type CellEditorBaseState<T> = ICellEditorBaseState<T> & T;
