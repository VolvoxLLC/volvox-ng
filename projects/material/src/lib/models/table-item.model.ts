export interface ITableItem<T> {
    changedRowKeys: string[];
    rowOriginalData: T;
}

export type TableItem<T> = ITableItem<T> & T;
