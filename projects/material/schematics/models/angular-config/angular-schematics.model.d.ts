import { IAngularSchematic } from './schematics/angular-schematic.model';
import { ICoreFacadeSchematic } from './schematics/core-facade-schematic.model';

export interface IAngularSchematics {
    [ schematic: string ]: IAngularSchematic | ICoreFacadeSchematic;
}
