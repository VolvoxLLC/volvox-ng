import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VarDirective } from './var.directive';

@NgModule({
    declarations: [VarDirective],
    imports: [
        CommonModule,
    ],
    exports: [VarDirective],
})
export class VarDirectiveModule {
}
