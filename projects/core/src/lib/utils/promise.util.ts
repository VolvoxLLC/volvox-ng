export type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
export type PromiseReject = (reason?: any) => void;