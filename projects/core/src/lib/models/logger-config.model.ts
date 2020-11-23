export interface ILoggerBaseConfig {
    duration?: number;
    className?: string;
    hideIcon?: boolean;
    showDismiss?: boolean;
    closeOnClick?: boolean;
}

export interface ILoggerDefaultConfig extends ILoggerBaseConfig {
    debug: boolean;
}

export interface ILoggerConfig extends ILoggerBaseConfig {
    action?: {
        label: string;
        callback?: () => void;
    };
}

export interface ILog {
    id: number;
    title: string;
    message: string;
    config: ILoggerConfig;
    icon: string;
    state?: 'enter' | 'leave';
}
