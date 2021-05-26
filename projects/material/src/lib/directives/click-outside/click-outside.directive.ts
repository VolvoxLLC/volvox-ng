import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {

    @Output()
    public clickOutside: EventEmitter<any> = new EventEmitter();

    @Input()
    public enableWhiteListing: boolean;

    constructor(
        private readonly elementRef: ElementRef,
    ) {
    }

    @HostListener('document:click', [ '$event.target' ])
    private onClick(targetElement: HTMLElement): void {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        const whiteListedClass = 'whitelisted';
        if (!clickedInside) {
            if (this.enableWhiteListing) {
                const isWhiteListed = targetElement.classList.contains(whiteListedClass)
                    || ClickOutsideDirective.getClosest(targetElement, whiteListedClass)
                    || ClickOutsideDirective.getClosest(targetElement, 'cdk-overlay-container');
                if (!isWhiteListed) {
                    this.clickOutside.emit([ this.elementRef.nativeElement, targetElement ]);
                }
            } else {
                this.clickOutside.emit([ this.elementRef.nativeElement, targetElement ]);
            }
        }
    }

    private static getClosest(el: HTMLElement, selector: string): HTMLElement {
        while (el) {
            if (el.classList.contains(selector)) {
                return el;
            }
            el = el.parentElement;
        }
    }

}
