import { Injectable } from '@angular/core';
import { ILoggerConfig, ILoggerDefaultConfig } from '../models/logger-config.model';
import { isNullOrUndefined } from '../utils/commons.util';

@Injectable({
    providedIn: 'root',
})
export class CoreLoggerService {

    public defaultConfig: ILoggerDefaultConfig;

    /**
     * Default constructor
     */
    constructor() {
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
     * Get the title to be shown in logger toast
     * @param err
     */
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
     * @param title
     * @param err
     * @param showUser
     * @param config
     */
    public logError(title: string, err: any, showUser?: boolean, config?: ILoggerConfig): void {
        config = this.serializeConfig(config);
        const msg = this.getErrorMsg(err);

        if (!title) {
            title = this.getErrorTitle(err);
        }

        config.className = 'snackbar-error';

        if (showUser) {
            this.show(title, msg, 'error', config);
        }

        CoreLoggerService.writeToConsole('error', title, msg);
    }

    /**
     * Logs a success message to the user
     * @param title
     * @param msg
     * @param showUser
     * @param config
     */
    public logSuccess(title: string, msg: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-success';

        if (showUser) {
            this.show(title, msg, 'success', config);
        }

        CoreLoggerService.writeToConsole('success', title, msg);
    }

    /**
     * Logs a warning to the user
     * @param title
     * @param msg
     * @param showUser
     * @param config
     */
    public logWarning(title: string, msg: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-warning';

        if (showUser) {
            this.show(title, msg, 'warning', config);
        }

        CoreLoggerService.writeToConsole('warning', title, msg);
    }

    /**
     * Logs an info to the user
     * @param title
     * @param msg
     * @param showUser
     * @param config
     */
    public logInfo(title: string, msg: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-info';

        if (showUser) {
            this.show(title, msg, 'info', config);
        }

        CoreLoggerService.writeToConsole('info', title, msg);
    }

    /**
     * Logs a message (only for debug)
     * @param data
     * @param showUser
     */
    public logDebug(data: any, showUser?: boolean): void {
        if (this.defaultConfig.debug) {
            this.log(null, data, showUser);
        }
    }

    /**
     * Logs any kind of message to the user
     * @param title
     * @param msg
     * @param showUser
     * @param config
     */
    public log(title: string, msg: string, showUser?: boolean, config?: ILoggerConfig): void {
        config = this.serializeConfig(config);
        config.className = 'snackbar-default';

        if (showUser) {
            this.show(title, msg, 'default', config);
        }

        CoreLoggerService.writeToConsole('log', title, msg);
    }

    /**
     * Show the log
     * @requires @volvox-ng/material
     * @param title
     * @param msg
     * @param type
     * @param config
     */
    public show(title: string, msg: string, type: string, config: ILoggerConfig): void {
        //
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

    /**
     * Writes data to console
     * @param type
     * @param title
     * @param msg
     * @private
     */
    private static writeToConsole(type: 'error' | 'success' | 'info' | 'warning' | 'log', title: string, msg: string): void {
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
            console.log(
                `%c[${ type.toUpperCase() }] ${ date.toLocaleDateString('en-US', dateOptions) } - ${ title || type }\n%c${ msg }`,
                `font-weight:bold;color: ${ color };`,
                `color: ${ color };`,
            );
        } else {
            console.log(msg);
        }
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

}
