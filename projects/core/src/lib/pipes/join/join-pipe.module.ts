import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JoinPipe } from './join.pipe';


@NgModule({
    declarations: [
        JoinPipe,
    ],
    exports: [
        JoinPipe,
    ],
    imports: [
        CommonModule,
    ],
})
export class JoinPipeModule { }
