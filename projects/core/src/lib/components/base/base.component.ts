import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { II18n } from '../../models/i18n.model';
import { i18n } from '../../utils/i18n.util';

@Component({
    selector: 'volvox-base',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnDestroy {

    public i18n: II18n = i18n;

    public ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor() {
    }

    public ngOnInit(): void {
        //
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
