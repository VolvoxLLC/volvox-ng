export interface ILoggerConfig {
    duration?: number;
    className?: string;
    hideIcon?: boolean;
    hideDismiss?: boolean;
    action?: {
        label: string;
        callback?: () => void;
    };
}

export interface ILogger {
    id: number;
    message: string;
    config: ILoggerConfig;
    icon: string;
    state?: 'enter' | 'leave';
}
