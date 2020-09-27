import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoggerComponent } from './logger.component';

@NgModule({
    declarations: [
        LoggerComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        LoggerComponent,
    ],
})
export class LoggerModule {
}
