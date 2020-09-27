import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'apollo-alert-widget',
    templateUrl: './alert.widget.html',
    styleUrls: ['./alert.widget.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertWidget implements OnInit, OnChanges {

    @Input()
    public icon: string;

    @Input()
    public title: string;

    @Input()
    public message: string;

    @Input()
    public type: 'warning' | 'error' | 'info' | 'success';

    constructor() {
    }

    public ngOnInit(): void {
        this.updateData();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.updateData();
    }

    private updateData(): void {
        if (!this.title || !this.icon) {
            switch (this.type) {
                case 'error':
                    this.icon ||= 'alert-circle-outline';
                    this.title ||= 'Error';
                    break;
                case 'info':
                    this.icon ||= 'information-outline';
                    this.title ||= 'Information';
                    break;
                case 'success':
                    this.icon ||= 'check';
                    this.title ||= 'Success';
                    break;
                case 'warning':
                    this.icon ||= 'alert-outline';
                    this.title ||= 'Warning';
                    break;
                default:
                    this.icon ||= 'information-outline';
                    this.title ||= 'Alert';
                    break;
            }
        }
    }

}
