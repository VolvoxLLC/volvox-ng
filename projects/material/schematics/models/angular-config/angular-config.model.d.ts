import { IAngularProjects } from '../angular-config.model';

export interface IAngularConfig {
    $schema: string;
    version: number;
    newProjectRoot: string;
    projects: IAngularProjects;
    defaultProject: string;
}
