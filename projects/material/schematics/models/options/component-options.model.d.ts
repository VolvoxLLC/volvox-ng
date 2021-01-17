import { IBaseOptions } from './base-options.model';

export interface IComponentOptions extends IBaseOptions {
    prefix?: string;
    style?: string;
}