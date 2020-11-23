import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'volvox-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: [ './loading-button.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingButtonComponent implements OnInit {

    @Input()
    public label: string;

    @Input()
    public mode: 'spinner' | 'progress-bar' = 'spinner';

    @Input()
    public loading: boolean;

    @Input()
    public color: ThemePalette = 'primary';

    @Input()
    public buttonType: 'default' | 'raised' | 'stroked' | 'flat';

    constructor() {
    }

    public ngOnInit(): void {
    }

}
