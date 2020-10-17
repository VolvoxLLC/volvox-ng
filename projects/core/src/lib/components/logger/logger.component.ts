import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoggerState } from '../../models/facades/logger-state.model';
import { ILogger, ILoggerConfig } from '../../models/logger-config.model';
import { LoggerFacade } from '../../services/facades/logger.facade';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'volvox-logger',
    templateUrl: './logger.component.html',
    styleUrls: [ './logger.component.scss' ],
    animations: [
        trigger('slide', [
            state('enter', style({ transform: 'translateX(0)' })),
            state('leave', style({ transform: 'translateX(120%)' })),
            transition('leave => enter', animate(200)),
            transition('enter => leave', animate(200)),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggerComponent extends BaseComponent implements OnInit {

    @ViewChildren('loggerElement')
    public elements: QueryList<any>;

    public loggerState$: BehaviorSubject<ILoggerState>;

    constructor(
        private myLoggerFacade: LoggerFacade,
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.loggerState$ = this.myLoggerFacade.store$;
    }

    // Shows snackbar
    public fadeIn(message: string, type: string, config: ILoggerConfig): number {
        const logs: ILogger[] = [ ...this.myLoggerFacade.snapshot.logs ];
        const i = logs.length;
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

        logs.push({ id: i, message, config, state: 'enter', icon });
        this.myLoggerFacade.updateLogs(logs);
        return i;
    }

    public slideOut(i: number): void {
        let logs: ILogger[] = [ ...this.myLoggerFacade.snapshot.logs ];
        if (logs.length > 0) {
            const item = logs.find((e: ILogger): boolean => e.id === i);
            item.state = 'leave';
            this.myLoggerFacade.updateLogs(logs);
            setTimeout((): void => {
                logs = [ ...this.myLoggerFacade.snapshot.logs ];
                const index = logs.findIndex((log: ILogger): boolean => log.id === item.id);
                logs.splice(index, 1);
                this.myLoggerFacade.updateLogs(logs);
            }, 200);
        }
    }

    public callAction(log: ILogger): void {
        log.config.action.callback.call(this);
        this.slideOut(log.id);
    }

}
