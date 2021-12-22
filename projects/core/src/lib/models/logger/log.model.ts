import { ILoggerConfig } from './logger-config.model';

export interface ILog {
    id: number;
    title: string;
    message: string;
    config: ILoggerConfig;
    icon: string;
    state?: 'enter' | 'leave';
}
