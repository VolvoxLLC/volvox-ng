import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { i18n } from '../../classes/i18n';
import { II18n } from '../../models/i18n.model';

@Component({
    selector: 'volvox-base',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent<T = any> implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public i18n: II18n = i18n;
    public store$: BehaviorSubject<T>;

    constructor() {
        this.store$ = new BehaviorSubject<T>({} as T);
    }

    public get snapshot(): T {
        return this.store$.value;
    }

    public ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    public ngOnInit(): void {
        //
    }

    public updateState(state: T): void {
        this.store$.next(state);
    }

}
