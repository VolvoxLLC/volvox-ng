export interface ISieveResponse<T = unknown> {
    totalCount?: number;
    data: T[];
}
