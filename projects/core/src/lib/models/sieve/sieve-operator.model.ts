/**
 * Sieve operator for filtering
 * @see https://github.com/Biarity/Sieve#operators
 */
export type SieveOperator =
    /**
     * Equals
     */
    '==' |
    /**
     * Not equals
     */
    '!=' |
    /**
     * Greater than
     */
    '>' |
    /**
     * Less than
     */
    '<' |
    /**
     * Greater than or equal to
     */
    '>=' |
    /**
     * Less than or equal to
     */
    '<=' |
    /**
     * Contains
     */
    '@=' |
    /**
     * Starts with
     */
    '_=' |
    /**
     * Does not Contains
     */
    '!@=' |
    /**
     * Does not Starts with
     */
    '!_=' |
    /**
     * Case-insensitive string Contains
     */
    '@=*' |
    /**
     * Case-insensitive string Starts with
     */
    '_=*' |
    /**
     * Case-insensitive string Equals
     */
    '==*' |
    /**
     * Case-insensitive string Not equals
     */
    '!=*' |
    /**
     * Case-insensitive string does not Contains
     */
    '!@=*' |
    /**
     * Case-insensitive string does not Starts with
     */
    '!_=*';
