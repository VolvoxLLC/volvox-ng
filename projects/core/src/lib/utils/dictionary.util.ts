import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDictionaryItem, IDictionaryObjectResult } from '../models/dictionary-item.model';

export class Dictionary<Key, Value> {

    private readonly dictionaryItems$: BehaviorSubject<IDictionaryItem<Key, Value>[]>;

    /**
     * Default constructor.
     * @param data Requires an array of IDictionaryItem with a key and a value
     */
    constructor(...data: IDictionaryItem<Key, Value>[]) {
        this.dictionaryItems$ = new BehaviorSubject<IDictionaryItem<Key, Value>[]>(data);
    }

    /**
     * Observable to subscribe to dictionary changes
     */
    public valueChanges(): Observable<IDictionaryItem<Key, Value>[]> {
        return this.dictionaryItems$.asObservable();
    }

    /**
     * Observable to subscribe to dictionary as object changes
     */
    public objectArray(): Observable<IDictionaryObjectResult<Value>> {
        return this.dictionaryItems$.asObservable()
            .pipe(
                map((items: IDictionaryItem<Key, Value>[]): IDictionaryObjectResult<Value> => this.toObject(items)),
            );
    }

    /**
     * Gets the items of the dictionary
     * @returns dictionary items
     */
    public get items(): IDictionaryItem<Key, Value>[] {
        return this.dictionaryItems$.value;
    }

    /**
     * Gets a dictionary item by key
     * @param key
     * @returns single dictionary item
     */
    public get(key: Key): IDictionaryItem<Key, Value> {
        return this.dictionaryItems$.value.find((item: IDictionaryItem<Key, Value>): boolean => item.key === key);
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
        const dictionaryItems: IDictionaryItem<Key, Value>[] = [ ...this.dictionaryItems$.value ];
        dictionaryItems.push({ key, value });
        this.updateItems(dictionaryItems);
    }

    /**
     * Updates a dictionary item
     * @param data
     * @param index
     */
    public update(data: IDictionaryItem<Key, Value>, index?: number): void {
        const dictionaryItems: IDictionaryItem<Key, Value>[] = [ ...this.dictionaryItems$.value ];
        if (!index) {
            index = this.getIndex(data.key);
        }

        if (index !== -1) {
            dictionaryItems[ index ] = data;
        } else {
            console.warn('Dictionary: Index not found');
        }
        this.updateItems(dictionaryItems);
    }

    /**
     * Gets an index with a specific key
     * @param key
     */
    public getIndex(key: Key): number {
        return this.dictionaryItems$.value.findIndex((val: IDictionaryItem<Key, Value>): boolean => val.key === key);
    }

    /**
     * Removes an item from the dictionary
     * @param value
     * @param index
     */
    public remove(value: Key, index?: number): void {
        const dictionaryItems: IDictionaryItem<Key, Value>[] = [ ...this.dictionaryItems$.value ];
        if (!index) {
            index = this.getIndex(value);
        }

        if (index !== -1) {
            dictionaryItems.splice(index, 1);
        } else {
            console.warn('Dictionary: Index not found');
        }
        this.updateItems(dictionaryItems);
    }

    /**
     * Private function to cast array to an object
     * @param items
     * @private
     */
    private toObject(items: IDictionaryItem<Key, Value>[]): IDictionaryObjectResult<Value> {
        const obj: IDictionaryObjectResult<Value> = {};
        for (const item of items) {
            obj[ item.key as any ] = item.value;
        }
        return obj;
    }

    /**
     * Private function to update dictionary items
     * @param items
     * @private
     */
    private updateItems(items: IDictionaryItem<Key, Value>[]): void {
        this.dictionaryItems$.next(items);
    }

}
