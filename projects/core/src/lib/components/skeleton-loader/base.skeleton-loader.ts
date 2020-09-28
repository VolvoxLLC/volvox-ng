import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'volvox-skeleton-loader',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseSkeletonLoader {

    @Input()
    public itemCount: number;

}
