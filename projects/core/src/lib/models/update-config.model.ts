export interface IUpdateConfig {
    refreshInterval?: number;
    ignoreTimeout?: number;
    localStorageKey?: string;
    versionPath: string;
    caption?: string;
    message?: string;
}

export interface IVersion {
    version: string;
    timestamp: number;
}

export enum UpdateDialogResult {
    cancel,
    ignore,
    reload,
}