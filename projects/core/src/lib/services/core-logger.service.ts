import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogEvent } from '../models/logger/log-event.model';
import { LogType } from '../models/logger/log-type.model';
import { ILoggerConfig } from '../models/logger/logger-config.model';
import { ILoggerDefaultConfig } from '../models/logger/logger-default-config.model';
import { isNullOrUndefined } from '../utils/commons.util';

@Injectable({
    providedIn: 'root',
})
export class CoreLoggerService {

    public defaultConfig: ILoggerDefaultConfig;

    private uiLogs$: BehaviorSubject<ILogEvent>;

    /**
     * Default constructor
     */
    constructor() {
        this.uiLogs$ = new BehaviorSubject(null);
    }

    public subUiLogs(): Observable<ILogEvent> {
        return this.uiLogs$.asObservable();
    }

    /**
     * Gets the error message from any type of object
     */
    public getErrorMsg(err: any): string {
        let msg: string = 'Unknown Error';

        if (!err) {
            return msg;
        }

        if (err instanceof HttpErrorResponse) {
            if (typeof err.error !== 'string') {
                return `volvox.commons.errors.status[${ err.status }].message`;
            }

            return err.error;
        }

        if (typeof err === 'string') {
            msg = err;
        } else if (err.msg) {
            msg = err.msg;
        } else if (err.error?.msg) {
            msg = err.error.msg;
        } else if (err.error?.message) {
            msg = err.error.message;
        } else if (err.error?.errors && err.error?.errors[ 0 ]?.message) {
            msg = err.error.errors[ 0 ].message;
        } else if (err.message) {
            msg = err.message;
        } else if (err.Message) {
            msg = err.Message;
        }

        if (typeof err.error === 'string') {
            msg = err.error;
        }

        return msg;
    }

    /**
     * Get the title to be shown in logger toast
     * @param err
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getErrorTitle(err: any): string {
        let title: string = 'volvox.commons.logs.error.label';
        if (err?.label) {
            title = err.label;
        } else if (err?.title) {
            title = err.title;
        } else if (err?.error?.label) {
            title = err.error.label;
        } else if (err?.error?.title) {
            title = err.error.title;
        }
        return title;
    }

    /**
     * Logs an error to the user
     * @param data
     * @param showUser
     * @param config
     */
    public logError(config: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.msg = this.getErrorMsg(config.msg);

        if (!config.title) {
            config.title = this.getErrorTitle(config.msg);
        }

        config.className = 'snackbar-error';

        this.show(config, 'error');
    }

    /**
     * Logs a success message to the user
     * @param data
     * @param config
     */
    public logSuccess(config: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-success';

        this.show(config, 'success');
    }

    /**
     * Logs a warning to the user
     * @param data
     * @param showUser
     * @param config
     */
    public logWarning(config: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-warning';

        this.show(config, 'warning');
    }

    /**
     * Logs an info to the user
     * @param data
     * @param config
     */
    public logInfo(config: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-info';

        this.show(config, 'info');
    }

    /**
     * Logs any kind of message to the user
     * @param data
     * @param config
     */
    public log(config: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-default';

        this.show(config, 'default');
    }

    /**
     * Show the log
     * @requires @volvox-ng/material
     * @param data
     * @param type
     * @param config
     */
    public show(config: ILoggerConfig, type: LogType): void {
        this.uiLogs$.next({ title: config.title, msg: config.msg, type, config });
    }

    /**
     * Serializes empty values, so no error is being returned
     * @param config
     * @private
     */
    private serializeConfig(config: ILoggerConfig): ILoggerConfig {
        // Check if user has default config
        if (!this.defaultConfig) {
            this.defaultConfig = {
                debug: true,
            };
        }

        if (!config) {
            // Get user default config
            config = {
                showDismiss: this.defaultConfig.showDismiss,
                closeOnClick: isNullOrUndefined(this.defaultConfig.closeOnClick) ? true : this.defaultConfig.closeOnClick,
                className: this.defaultConfig.className,
                duration: this.defaultConfig.duration || 4,
            };
        }

        // Serialize configuration
        config.duration = CoreLoggerService.getValue<number>(config.duration, this.defaultConfig.duration, 4);
        config.className = CoreLoggerService.getValue<string>(config.className, this.defaultConfig.className, null);
        config.showDismiss = CoreLoggerService.getValue<boolean>(config.showDismiss, this.defaultConfig.showDismiss, false);
        config.closeOnClick = CoreLoggerService.getValue<boolean>(config.closeOnClick, this.defaultConfig.closeOnClick, true);

        return config;
    }

    /**
     * Gets a value which is not undefined or null
     * @param val
     * @param val1
     * @param def
     * @private
     */
    private static getValue<T>(val: T, val1: T, def: T): T {
        if (isNullOrUndefined(val)) {
            if (isNullOrUndefined(val1)) {
                return def;
            }
            return val1;
        }
        return val;
    }

}
