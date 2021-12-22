export type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseReject = (reason?: any) => void;
