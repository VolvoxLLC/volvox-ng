import { ILogMessageData } from './log-message-data.model';
import { ILoggerConfig } from './logger-config.model';

export interface ILogEvent extends ILogMessageData {
    type: string;
    config: ILoggerConfig;
}
