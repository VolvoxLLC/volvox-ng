import { ILoggerBaseConfig } from './logger-base-config.model';

export interface ILoggerDefaultConfig extends ILoggerBaseConfig {
    debug: boolean;
}