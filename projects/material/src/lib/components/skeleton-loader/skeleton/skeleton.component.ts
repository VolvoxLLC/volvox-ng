import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Skeleton } from '../../../models/skeleton.model';

@Component({
    selector: 'volvox-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: [ './skeleton.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent implements OnInit {

    private get actualWidth(): string {
        if (this.skeleton.randomizeOffset > 0 && typeof this.skeleton.width === 'number') {
            return `${ this.skeleton.width - Math.floor(Math.random() * this.skeleton.randomizeOffset) }px`;
        }

        return SkeletonComponent.value(this.skeleton.width);
    }

    @Input()
    public skeleton: Skeleton;

    @Input()
    public width: number | string;

    @Input()
    public height: number | string;

    @Input()
    public randomizeOffset: number;

    @Input()
    public borderRadius: number | string;

    private readonly element: HTMLElement;

    constructor(
        private readonly myElementRef: ElementRef,
    ) {
        this.element = this.myElementRef.nativeElement;
    }

    public ngOnInit(): void {
        if (!this.skeleton) {
            this.skeleton = new Skeleton({
                width: this.width,
                height: this.height,
                borderRadius: this.borderRadius,
                randomizeOffset: this.randomizeOffset,
            });
        }
        this.element.style.width = this.actualWidth;
        this.element.style.height = SkeletonComponent.value(this.skeleton.height);
        this.element.style.borderRadius = SkeletonComponent.value(this.skeleton.borderRadius);
    }

    private static value(val: number | string): string {
        if (typeof val === 'number') {
            return val + 'px';
        }
        return val;
    }

}
