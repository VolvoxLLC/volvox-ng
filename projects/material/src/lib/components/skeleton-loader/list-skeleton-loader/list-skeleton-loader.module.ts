import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SkeletonLoaderModule } from '../skeleton-loader.module';
import { ListSkeletonLoader } from './list.skeleton-loader';

@NgModule({
    declarations: [ListSkeletonLoader],
    imports: [
        CommonModule,
        MatListModule,
        SkeletonLoaderModule,
    ],
    exports: [ListSkeletonLoader],
})
export class ListSkeletonLoaderModule {
}
