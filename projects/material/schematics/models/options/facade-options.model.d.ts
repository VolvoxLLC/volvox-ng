import { ICoreFacadeSchematic } from '../angular-config/schematics/core-facade-schematic.model';
import { IBaseOptions } from './base-options.model';

export interface IFacadeOptions extends IBaseOptions, ICoreFacadeSchematic {
    withSnapshot?: boolean;
    modelFolderPath?: string;
    useSnapshotFunction?: boolean;
    useClass?: boolean;

    // Just for core evaluation, no option parameter
    modelRelativePath?: string;
}
