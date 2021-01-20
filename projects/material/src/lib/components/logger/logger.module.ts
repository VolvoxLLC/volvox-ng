import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerComponent } from './logger.component';

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
