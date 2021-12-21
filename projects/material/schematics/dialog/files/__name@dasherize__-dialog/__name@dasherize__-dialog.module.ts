import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { <%= classify(name) %>DialogComponent } from './<%= dasherize(name) %>-dialog.component';

@NgModule({
    declarations: [ <%= classify(name) %>DialogComponent ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ],
})
export class <%= classify(name) %>DialogModule {
}
