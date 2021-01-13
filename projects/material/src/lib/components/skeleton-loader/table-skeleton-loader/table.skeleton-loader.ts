import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Skeleton } from '../../../models/skeleton.model';
import { BaseSkeletonLoader } from '../base.skeleton-loader';

@Component({
    selector: 'volvox-table-skeleton-loader',
    templateUrl: './table.skeleton-loader.html',
    styleUrls: ['./table.skeleton-loader.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeletonLoader extends BaseSkeletonLoader implements OnInit {

    @Input()
    public columns: Skeleton[][];

    public items: Skeleton[][] = [];
    public displayedColumns: string[] = [];

    constructor() {
        super();
    }

    public ngOnInit(): void {
        for (let i = 0; i < this.columns.length; i++) {
            this.displayedColumns.push(`column-${i}`);
        }

        for (let i = 0; i < this.itemCount; i++) {
            const skeletons: Skeleton[] = [];
            for (let j = 0; j < this.displayedColumns.length; j++) {
                const skeleton = this.columns[j][1];
                skeletons.push(new Skeleton({
                    width: skeleton.width,
                    height: skeleton.height,
                    borderRadius: skeleton.borderRadius,
                    randomizeOffset: skeleton.randomizeOffset,
                }));
            }
            this.items.push(skeletons);
        }
    }

}
