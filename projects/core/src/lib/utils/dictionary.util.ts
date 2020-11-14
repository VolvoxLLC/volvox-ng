import { IDictionaryItem } from '../models/dictionary-item.model';

export class Dictionary<Key, Value> {

    private readonly dictionaryItems: IDictionaryItem<Key, Value>[];

    /**
     * Default constructor.
     * @param data Requires an array of IDictionaryItem with a key and a value
     */
    constructor(...data: IDictionaryItem<Key, Value>[]) {
        this.dictionaryItems = data;
    }

    /**
     * Gets the items of the dictionary
     * @returns dictionary items
     */
    public get items(): IDictionaryItem<Key, Value>[] {
        return this.dictionaryItems;
    }

    /**
     * Gets a dictionary item by key
     * @param key
     * @returns single dictionary item
     */
    public get(key: Key): IDictionaryItem<Key, Value> {
        return this.dictionaryItems.find((item: IDictionaryItem<Key, Value>): boolean => item.key === key);
    }

    /**
     * Checks if dictionary contains item
     * @param key
     */
    public contains(key: Key): boolean {
        return this.get(key) != null;
    }

    /**
     * Adds a dictionary item
     * @param key
     * @param value
     */
    public add(key: Key, value: Value): void {
        this.dictionaryItems.push({key, value});
    }
}
