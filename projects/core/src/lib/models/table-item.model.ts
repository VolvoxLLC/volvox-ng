export class TableItem<T extends any> {
    public rowChangedRowKeys: string[];
    public rowOriginalData: TableItem<T>;
}

export function mapTable<T>(data: TableItem<any>[]): T[] {
    return data as any as T[];
}
