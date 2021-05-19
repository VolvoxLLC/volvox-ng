import { ILogMessageData } from './log-message-data.model';
import { ILoggerBaseConfig } from './logger-base-config.model';

export interface ILoggerConfig extends ILoggerBaseConfig, ILogMessageData {
    action?: {
        label: string;
        callback?: () => void;
    };
}
