/**
 * Interface for dictionary class. Has a key and a value
 */
export interface IDictionaryItem<Key, Value> {
    key: Key;
    value: Value;
}

/**
 * Interface for dictionary object result. Can contain string or number as a key
 */
export interface IDictionaryObjectResult<Value> {
    /**
     * Key as string
     */
    [ key: string ]: Value;

    /**
     * Key as number
     */
    [ key: number ]: Value;
}