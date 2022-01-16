import { SieveOperator } from './sieve-operator.model';

/**
 * Sieve filter interface
 */
export interface ISieveFilter {
    key: string;
    operator: SieveOperator;
    value: string;
}