import { Injectable } from '@angular/core';
import { LoggerComponent } from '../components/logger/logger.component';
import { ILoggerConfig } from '../models/logger-config.model';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {

    private loggerComp: LoggerComponent;
    private isDebug: boolean;

    /**
     * Default constructor
     */
    constructor() {
    }

    /**
     * Serializes empty values, so no error is being returned
     * @param config
     * @private
     */
    private static serializeConfig(config: ILoggerConfig): ILoggerConfig {
        if (!config) {
            config = {};
            config.hideDismiss = true;
        }
        if (!config.duration) {
            config.duration = 5;
        }
        return config;
    }

    /**
     * Writes data to console
     * @param type
     * @param msg
     * @private
     */
    private static writeToConsole(type: 'error' | 'success' | 'info' | 'warning' | 'log', msg: string): void {
        const date = new Date();
        const dateOptions = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        if (typeof msg !== 'object') {
            msg = `${ date.toLocaleDateString('en-US', dateOptions) }: ${ msg }`;

            let css: string = 'background: #222222;padding:10px;border-radius:4px;border:1px solid;border-left:5px solid;';
            let color: string = '#DDDDDD';
            switch (type) {
                case 'warning':
                    color = '#FFC107';
                    break;
                case 'success':
                    color = '#69F0AE';
                    break;
                case 'info':
                    color = '#B3E5FC';
                    break;
                case 'error':
                    color = '#FF8A80';
                    break;
            }
            css += `color: ${ color };border-color: ${ color };`;

            console.log(`%c[${ type.toUpperCase() }] ${ msg }`, css);
        } else {
            console.log(msg);
        }
    }

    /**
     * Setter for logger
     * @param component
     * @param isDebug
     */
    public logger(component: LoggerComponent, isDebug: boolean): void {
        this.loggerComp = component;
        this.isDebug = isDebug;
    }

    /**
     * Gets the error message from any type of object
     * @param err
     */
    public getErrorMsg(err: any): string {
        let msg = 'Error';

        if (err) {
            if (typeof err === 'string') {
                msg = err;
            } else if (err.msg) {
                msg = err.msg;
            } else if (err.error?.msg) {
                msg = err.error.msg;
            } else if (err.error?.message) {
                msg = err.error.message;
            } else if (err.error?.errors && err.error?.errors[0]?.message) {
                msg = err.error.errors[0].message;
            } else if (err.message) {
                msg = err.message;
            } else if (err.Message) {
                msg = err.Message;
            }

            if (typeof err.error === 'string') {
                msg = err.error;
            }
        }

        return msg;
    }

    /**
     * Logs an error to the user
     * @param err
     * @param showUser
     * @param config
     */
    public logError(err: any, showUser?: boolean, config?: ILoggerConfig): void {
        config = LoggerService.serializeConfig(config);
        const msg = this.getErrorMsg(err);
        config.className = 'snackbar-error';

        if (showUser) {
            this.show(msg, 'error', config);
        }

        LoggerService.writeToConsole('error', msg);
    }

    /**
     * Logs a success message to the user
     * @param msg
     * @param showUser
     * @param config
     */
    public logSuccess(msg?: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = LoggerService.serializeConfig(config);
        config.className = 'snackbar-success';

        if (showUser) {
            this.show(msg, 'success', config);
        }

        LoggerService.writeToConsole('success', msg);
    }

    /**
     * Logs a warning to the user
     * @param msg
     * @param showUser
     * @param config
     */
    public logWarning(msg?: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = LoggerService.serializeConfig(config);
        config.className = 'snackbar-warning';

        if (showUser) {
            this.show(msg, 'warning', config);
        }

        LoggerService.writeToConsole('warning', msg);
    }

    /**
     * Logs an info to the user
     * @param msg
     * @param showUser
     * @param config
     */
    public logInfo(msg?: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = LoggerService.serializeConfig(config);
        config.className = 'snackbar-info';

        if (showUser) {
            this.show(msg, 'info', config);
        }

        LoggerService.writeToConsole('info', msg);
    }

    /**
     * Logs a message (only for debug)
     * @param data
     * @param showUser
     */
    public logDebug(data: any, showUser?: boolean): void {
        if (this.isDebug) {
            this.log(data, showUser);
        }
    }

    /**
     * Logs any kind of message to the user
     * @param msg
     * @param showUser
     * @param config
     */
    public log(msg?: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = LoggerService.serializeConfig(config);
        config.className = 'snackbar-default';

        if (showUser) {
            this.show(msg, 'default', config);
        }

        LoggerService.writeToConsole('log', msg);
    }

    /**
     * Shows the log
     * @param msg
     * @param type
     * @param config
     * @private
     */
    private show(msg: string, type: string, config: ILoggerConfig): void {
        if (this.loggerComp) {
            const i = this.loggerComp.fadeIn(msg, type, config);

            if (config.duration !== -1) {
                setTimeout((): void => {
                    this.loggerComp.slideOut(i);
                }, config.duration * 1000);
            }
        }
    }

}
