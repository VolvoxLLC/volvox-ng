import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[onScroll]',
})
export class ScrollDirective {

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public onScroll: EventEmitter<Event> = new EventEmitter<Event>();

    constructor() {
    }

    @HostListener('window:scroll', [ '$event' ])
    private scroll(e: Event): void {
        this.onScroll.emit(e);
    }

}
