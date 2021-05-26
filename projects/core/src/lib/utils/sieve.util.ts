/**
 * Sieve operator for filtering
 */
export type SieveOperator = '<' | '>' | '<=' | '@=' | '@=*' | '==' | '!=';

/**
 * Sieve sort interface
 */
export interface ISieveSort {
    desc?: boolean;
    name: string;
}

/**
 * Sieve filter interface
 */
export interface ISieveFilter {
    key: string;
    operator: SieveOperator;
    value: string;
}

/**
 * Sieve options interface
 */
export interface ISieveOptions {
    sorts?: ISieveSort[];
    filters?: ISieveFilter[];
    page?: number;
    pageSize?: number;
}

export class Sieve {

    private readonly options: ISieveOptions;
    private _baseUrl: string;

    /**
     * Default constructor.
     * @param url base url
     * @param options sieve options
     */
    constructor(url: string, options: ISieveOptions) {
        this.baseUrl = url;
        this.options = options;
        this.options.filters = options.filters || [];
        this.options.sorts = options.sorts || [];
    }

    /**
     * public getter to get page size
     */
    public get pageSize(): number {
        return this.options.pageSize;
    }

    /**
     * Setter to set page size
     */
    public set pageSize(pageSize: number) {
        this.options.pageSize = pageSize;
    }

    /**
     * public getter to get page
     */
    public get page(): number {
        return this.options.page;
    }

    /**
     * Setter to set page
     */
    public set page(page: number) {
        this.options.page = page;
    }

    /**
     * public getter to get filters
     */
    public get filters(): ISieveFilter[] {
        return this.options.filters;
    }

    /**
     * Setter to set filters
     */
    public set filters(filters: ISieveFilter[]) {
        this.options.filters = filters;
    }

    /**
     * public getter to get sorts
     */
    public get sorts(): ISieveSort[] {
        return this.options.sorts;
    }

    /**
     * Setter to set sorts
     */
    public set sorts(sorts: ISieveSort[]) {
        this.options.sorts = sorts;
    }

    /**
     * method to add a sort option
     * @param name of the item to sort
     * @param desc sort descending
     */
    public addSort(name: string, desc?: boolean): void {
        this.options.sorts.push({
            name,
            desc,
        });
    }

    /**
     * method to add a filter option
     * @param key of the item
     * @param operator { SieveOperator }
     * @param value filtered value
     */
    public addFilter(key: string, operator: SieveOperator, value: string): void {
        this.options.filters.push({
            key,
            operator,
            value,
        });
    }

    /**
     * Getter for base url
     */
    public get baseUrl(): string {
        return this._baseUrl;
    }

    /**
     * Setter for base url
     * @param url
     */
    public set baseUrl(url: string) {
        this._baseUrl = url;
    }

    /**
     * Convert to queried string
     */
    public getUrl(): string {
        return `${ this._baseUrl }${ this.toQuery() }`;
    }

    /**
     * to Query
     * @private converts options to actual query
     */
    private toQuery(): string {
        let query = '?';

        if (this.page) {
            query += `page=${ this.page }`;
        }

        if (this.pageSize) {
            query += `&pageSize=${ this.pageSize }`;
        }

        if (this.filters?.length) {
            let filterQuery: string = '&filters=';

            for (const filter of this.filters) {
                if (filter.value) {
                    filterQuery += `${ filter.key }${ filter.operator }${ filter.value },`;
                }
            }

            if (filterQuery !== '&filters=') {
                filterQuery = filterQuery.slice(0, -1);
                query += filterQuery;
            }
        }

        if (this.sorts?.length) {
            let sortQuery: string = '&sorts=';

            for (const sort of this.sorts) {
                sortQuery += `${ sort.desc ? '-' : '+' }${ sort.name },`;
            }

            sortQuery = sortQuery.slice(0, -1);
            query += sortQuery;
        }

        if (query.startsWith('&')) {
            query = query.slice(1);
        }

        return query;
    }

}
