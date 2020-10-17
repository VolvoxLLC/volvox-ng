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
    private readonly baseUrl: string;

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
     * public getter to get page
     */
    public get page(): number {
        return this.options.page;
    }

    /**
     * public getter to get filters
     */
    public get filters(): ISieveFilter[] {
        return this.options.filters;
    }

    /**
     * public getter to get sorts
     */
    public get sorts(): ISieveSort[] {
        return this.options.sorts;
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
     * Convert to queried string
     */
    public getUrl(): string {
        return `${ this.baseUrl }${ this.toQuery() }`;
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
            query += '&';

            for (const filter of this.filters) {
                if (filter.value) {
                    query += `${ filter.key }${ filter.operator }${ filter.value },`;
                }
            }
            query = query.slice(0, -1);
        }

        if (this.sorts?.length) {
            query += '&';

            for (const sort of this.sorts) {
                query += `${ sort.desc ? '-' : '+' }${ sort.name },`;
            }
            query = query.slice(0, -1);
        }

        if (query.startsWith('&')) {
            query = query.slice(1);
        }

        return query;
    }

}
