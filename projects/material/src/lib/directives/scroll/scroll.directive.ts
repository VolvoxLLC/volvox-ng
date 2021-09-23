import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[onScroll]',
})
export class ScrollDirective {

    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    public onScroll: EventEmitter<Event> = new EventEmitter<Event>();

    constructor() {
    }

    @HostListener('window:scroll', [ '$event' ])
    private scroll(e: Event): void {
        this.onScroll.emit(e);
    }

}
