import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingButtonComponent } from './loading-button.component';

@NgModule({
    declarations: [ LoadingButtonComponent ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatButtonModule,
    ],
    exports: [ LoadingButtonComponent ],
})
export class LoadingButtonModule {
}
