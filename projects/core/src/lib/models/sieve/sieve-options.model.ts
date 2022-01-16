import { ISieveFilter } from './sieve-filter.model';
import { ISieveSort } from './sieve-sort.model';

/**
 * Sieve options interface
 */
export interface ISieveOptions {
    sorts?: ISieveSort[];
    filters?: ISieveFilter[];
    page?: number;
    pageSize?: number;
}