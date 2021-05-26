import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ngVar]',
})
export class VarDirective {

    private context: any = {};

    constructor(private myViewContainerRef: ViewContainerRef, private myTemplateRef: TemplateRef<any>) {
    }

    @Input()
    public set ngVar(context: any) {
        this.context.$implicit = this.context.ngVar = context;
        this.updateView();
    }

    private updateView(): void {
        this.myViewContainerRef.clear();
        this.myViewContainerRef.createEmbeddedView(this.myTemplateRef, this.context);
    }

}
