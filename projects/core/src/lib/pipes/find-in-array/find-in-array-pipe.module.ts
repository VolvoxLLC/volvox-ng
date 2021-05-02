import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FindInArrayPipe } from './find-in-array.pipe';

@NgModule({
    declarations: [
        FindInArrayPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FindInArrayPipe,
    ],
})
export class FindInArrayPipeModule {
}
