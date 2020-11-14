import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { II18n } from '../../models/i18n.model';
import { i18n } from '../../utils/i18n.util';

@Component({
    selector: 'volvox-base',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public i18n: II18n = i18n;

    constructor() {
    }

    public ngOnInit(): void {
        //
    }

    public ngOnDestroy(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
