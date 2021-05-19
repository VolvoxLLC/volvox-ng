import { Injectable } from '@angular/core';
import { CoreLoggerService, ILoggerConfig, ILoggerDefaultConfig } from '@volvox-ng/core';
import { LoggerComponent } from '../components/logger/logger.component';

@Injectable({
    providedIn: 'root',
})
export class LoggerService extends CoreLoggerService {

    private loggerComp: LoggerComponent;

    /**
     * Default constructor
     */
    constructor() {
        super();
    }

    /**
     * Setter for logger
     * @param component
     * @param defaultConfig
     */
    public logger(component: LoggerComponent, defaultConfig: ILoggerDefaultConfig): void {
        this.loggerComp = component;
        this.defaultConfig = defaultConfig;
    }

    /**
     * Shows the log
     * @param title
     * @param msg
     * @param type
     * @param config
     */
    public show(config: ILoggerConfig, type: string): void {
        super.show(config, type);
        if (this.loggerComp) {
            const i = this.loggerComp.slideIn(config.title, config.msg, type, config);

            if (config.duration !== -1) {
                setTimeout((): void => {
                    this.loggerComp.slideOut(i);
                }, config.duration * 1000);
            }
        }
    }

}
