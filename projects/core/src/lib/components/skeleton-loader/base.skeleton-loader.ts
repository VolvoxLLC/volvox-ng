import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'apollo-skeleton-loader',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseSkeletonLoader {

    @Input()
    public itemCount: number;

}
