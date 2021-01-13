import { MatTableDataSource } from '@angular/material/table';
import { TableItem } from '../table-item.model';

export interface ICellEditorBaseState<T> {
    loading: boolean;
    displayedColumns: string[];
    dataSource: MatTableDataSource<TableItem<T>>;
}