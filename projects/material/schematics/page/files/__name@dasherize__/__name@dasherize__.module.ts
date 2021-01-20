import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';

@NgModule({
    declarations: [ <%= classify(name) %>Page ],
    imports: [
        CommonModule,
    ],
})
export class <%= classify(name) %>Module {
}