export interface IUpdateConfig {
    refreshInterval?: number;
    ignoreTimeout?: number;
    localStorageKey?: string;
    versionPath: string;
    showIgnore?: boolean;
    title?: string;
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