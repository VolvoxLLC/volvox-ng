import { StyleSchema } from './style-schema.model';

export interface IAngularSchematic {
    style: StyleSchema;
}

export interface IAngularSchematics {
    [schematic: string]: IAngularSchematic;
}

export interface IAngularProjectArchitect {
    [architect: string]: any;
}

export interface IAngularProject {
    projectType: 'application' | 'library';
    schematics: IAngularSchematics;
    root: string;
    sourceRoot: string;
    prefix: string;
    architect: IAngularProjectArchitect;
}

export interface IAngularProjects {
    [name: string]: IAngularProject;
}

export interface IAngularConfig {
    $schema: string;
    version: number;
    newProjectRoot: string;
    projects: IAngularProjects;
    defaultProject: string;
}