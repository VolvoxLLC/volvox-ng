import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'volvox-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: [ './loading-button.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonComponent {

    @Input()
    public mode: 'spinner' | 'progress-bar' = 'spinner';

    @Input()
    public loading: boolean;

    @Input()
    public disabled: boolean;

    @Input()
    public color: ThemePalette = 'primary';

    @Input()
    public buttonType: 'default' | 'raised' | 'stroked' | 'flat' | 'icon';

    @Input()
    public icon: string;

    @Output()
    public click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor() {
    }

    public onClick(e: MouseEvent): void {
        e.stopPropagation();
        this.click.emit(e);
    }

}
