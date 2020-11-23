import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoggerState } from '../../models/facades/logger-state.model';
import { ILog, ILoggerConfig } from '../../models/logger-config.model';
import { LoggerFacade } from '../../services/facades/logger.facade';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'volvox-logger',
    templateUrl: './logger.component.html',
    styleUrls: [ './logger.component.scss' ],
    animations: [
        trigger('slide', [
            state('enter', style({ transform: 'translateX(0)' })),
            transition(':leave', [
                animate(200, style({ transform: 'translateX(120%)' })),
            ]),
            transition(':enter', [
                style({ transform: 'translateX(120%)' }),
                animate(200, style({ transform: 'translateX(0)' })),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggerComponent extends BaseComponent implements OnInit {

    @ViewChildren('loggerElement')
    public elements: QueryList<any>;

    public loggerState$: Observable<ILoggerState>;

    /**
     * Default constructor
     * @param myLoggerFacade
     */
    constructor(
        private myLoggerFacade: LoggerFacade,
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.loggerState$ = this.myLoggerFacade.subState();
    }

    public onClickLog(log: ILog): void {
        if (log.config.closeOnClick) {
            this.slideOut(log.id);
        }
    }

    /**
     * Shows the snackbar
     * @param title
     * @param message
     * @param type
     * @param config
     */
    public slideIn(title: string, message: string, type: string, config: ILoggerConfig): number {
        const logs: ILog[] = [ ...this.myLoggerFacade.snapshot.logs ];
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

        logs.push({ id: i, title, message, config, state: 'enter', icon });
        this.myLoggerFacade.updateLogs(logs);
        return i;
    }

    /**
     * Hides the log
     * @param id
     */
    public slideOut(id: number): void {
        let logs: ILog[] = [ ...this.myLoggerFacade.snapshot.logs ];
        if (logs.length > 0) {
            const item = logs.find((e: ILog): boolean => e.id === id);
            item.state = 'leave';
            this.myLoggerFacade.updateLogs(logs);
            setTimeout((): void => {
                logs = [ ...this.myLoggerFacade.snapshot.logs ];
                const index = logs.findIndex((log: ILog): boolean => log.id === item.id);
                logs.splice(index, 1);
                this.myLoggerFacade.updateLogs(logs);
            }, 200);
        }
    }

    public callAction(log: ILog): void {
        log.config.action.callback.call(this);
        this.slideOut(log.id);
    }

}
