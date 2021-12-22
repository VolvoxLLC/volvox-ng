import { ILogMessageData } from './log-message-data.model';
import { LogType } from './log-type.model';
import { ILoggerConfig } from './logger-config.model';

export interface ILogEvent extends ILogMessageData {
    type: LogType;
    config: ILoggerConfig;
}
