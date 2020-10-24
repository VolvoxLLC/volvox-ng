import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoggerComponent } from './logger.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        LoggerComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
    ],
    exports: [
        LoggerComponent,
    ],
})
export class LoggerModule {
}
