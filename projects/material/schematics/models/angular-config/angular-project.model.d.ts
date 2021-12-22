import { IAngularProjectArchitect } from './angular-project-architect.model';
import { IAngularSchematics } from './angular-schematics.model';

export interface IAngularProject {
    projectType: 'application' | 'library';
    schematics: IAngularSchematics;
    root: string;
    sourceRoot: string;
    prefix: string;
    architect: IAngularProjectArchitect;
}
