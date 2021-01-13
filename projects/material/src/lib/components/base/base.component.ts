import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { i18n, II18n } from '@volvox-ng/core';
import { Subject } from 'rxjs';

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
