import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ILogger, ILoggerConfig } from '../../models/logger-config.model';
import { BaseComponent } from "../base/base.component";

@Component({
    selector: 'volvox-logger',
    templateUrl: './logger.component.html',
    styleUrls: ['./logger.component.scss'],
    animations: [
        trigger('slide', [
            state('enter', style({transform: 'translateX(0)'})),
            state('leave', style({transform: 'translateX(120%)'})),
            transition('leave => enter', animate(200)),
            transition('enter => leave', animate(200)),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggerComponent extends BaseComponent implements OnInit {

    @ViewChildren('loggerElement')
    public elements: QueryList<any>;

    public logs: ILogger[] = [];

    constructor(
        private readonly myChangeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    // Shows snackbar
    public fadeIn(message: string, type: string, config: ILoggerConfig): number {
        const i = this.logs.length;
        let icon: string;

        switch (type) {
            case 'error':
                icon = 'alert-circle-outline';
                break;
            case 'warning':
                icon = 'alert-outline';
                break;
            case 'info':
                icon = 'information-outline';
                break;
            case 'success':
                icon = 'check';
                break;
            case 'default':
                icon = 'bell-outline';
                break;
        }

        this.logs.push({id: i, message, config, state: 'enter', icon});

        this.myChangeDetectorRef.markForCheck();
        return i;
    }

    public slideOut(i: number): void {
        if (this.logs.length > 0) {
            const item = this.logs.find((e: ILogger): boolean => e.id === i);
            item.state = 'leave';
            this.myChangeDetectorRef.markForCheck();
            setTimeout((): void => {
                const index = this.logs.findIndex((log: ILogger): boolean => log.id === item.id);
                this.logs.splice(index, 1);
                this.myChangeDetectorRef.markForCheck();
            }, 200);
        }
    }

    public callAction(log: ILogger): void {
        log.config.action.callback.call(this);
        this.slideOut(log.id);
    }

}
