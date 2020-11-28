import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VolvoxDurationPipe } from './volvox-duration.pipe';

@NgModule({
    declarations: [ VolvoxDurationPipe ],
    imports: [
        CommonModule,
    ],
    exports: [ VolvoxDurationPipe ],
})
export class VolvoxDurationPipeModule {
}
