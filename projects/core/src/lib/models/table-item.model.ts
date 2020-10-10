export interface ITableItem<T> {
    rowChangedRowKeys: string[];
    rowOriginalData: T;
}

export type TableItem<T> = ITableItem<T> & T;
