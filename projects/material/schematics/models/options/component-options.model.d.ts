import { ICoreComponentSchematic } from '../angular-config/schematics/core-component-schematic.model';
import { StyleSchema } from '../style-schema.model';
import { IBaseOptions } from './base-options.model';

export interface IComponentOptions extends IBaseOptions, ICoreComponentSchematic {
    prefix?: string;
    style?: StyleSchema;
    skipTests?: boolean;
    createFacade?: boolean;
    facadeFolderPath?: string;
    useFacadeInTemplate?: boolean;

    // Just for core evaluation, no option parameter
    facadeRelativePath?: string;
    facadeModelFolderRelativePath?: string;
}
