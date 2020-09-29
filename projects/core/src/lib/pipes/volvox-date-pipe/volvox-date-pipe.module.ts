import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { VolvoxDatePipe } from './volvox-date.pipe';

@NgModule({
    declarations: [VolvoxDatePipe],
    imports: [
        CommonModule,
    ],
    exports: [VolvoxDatePipe],
    providers: [DatePipe],
})
export class VolvoxDatePipeModule {
}
