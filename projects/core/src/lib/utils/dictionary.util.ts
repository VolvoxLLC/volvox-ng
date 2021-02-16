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
        this.dictionaryItems.push({ key, value });
    }

    /**
     * Updates a dictionary item
     * @param data
     * @param index
     */
    public update(data: IDictionaryItem<Key, Value>, index?: number): void {
        if (!index) {
            index = this.getIndex(data.key);
        }

        if (index !== -1) {
            this.dictionaryItems[ index ] = data;
        } else {
            console.warn('Dictionary: Index not found');
        }
    }

    /**
     * Gets an index with a specific key
     * @param key
     */
    public getIndex(key: Key): number {
        return this.dictionaryItems.findIndex((val: IDictionaryItem<Key, Value>): boolean => val.key === key);
    }

    /**
     * Removes an item from the dictionary
     * @param value
     * @param index
     */
    public remove(value: Key, index?: number): void {
        if (!index) {
            index = this.getIndex(value);
        }

        if (index !== -1) {
            this.dictionaryItems.splice(index, 1);
        } else {
            console.warn('Dictionary: Index not found');
        }
    }

}
