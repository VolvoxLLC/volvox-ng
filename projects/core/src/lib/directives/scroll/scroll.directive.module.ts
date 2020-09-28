import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollDirective } from './scroll.directive';

@NgModule({
    declarations: [ScrollDirective],
    imports: [CommonModule],
    exports: [ScrollDirective],
})
export class ScrollDirectiveModule {
}
