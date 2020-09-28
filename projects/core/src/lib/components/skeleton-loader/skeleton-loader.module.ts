import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseSkeletonLoader } from './base.skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';

@NgModule({
    declarations: [BaseSkeletonLoader, SkeletonComponent],
    imports: [
        CommonModule,
    ],
    exports: [
        BaseSkeletonLoader,
        SkeletonComponent,
    ],
})
export class SkeletonLoaderModule {
}
