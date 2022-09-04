import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SkeletonLoaderModule } from '../skeleton-loader.module';
import { TableSkeletonLoader } from './table.skeleton-loader';

@NgModule({
    declarations: [ TableSkeletonLoader ],
    imports: [
        CommonModule,
        MatTableModule,
        SkeletonLoaderModule,
    ],
    exports: [
        TableSkeletonLoader,
    ],
})
export class TableSkeletonLoaderModule {
}
