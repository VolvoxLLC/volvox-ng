import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlertWidget } from './alert.widget';

@NgModule({
    declarations: [ AlertWidget ],
    exports: [
        AlertWidget,
    ],
    imports: [
        CommonModule,
        MatIconModule,
    ],
})
export class AlertWidgetModule {
}
