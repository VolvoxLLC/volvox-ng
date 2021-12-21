import { Tree } from '@angular-devkit/schematics';
import { IAngularConfig } from '../models/angular-config/angular-config.model';

export class DataLoader {

    /**
     * Load angular.json config file
     */
    public static loadWorkspaceConfig(tree: Tree): IAngularConfig {
        const workspaceConfig: Buffer = tree.read('/angular.json') as Buffer;
        if (workspaceConfig) {
            return JSON.parse(workspaceConfig.toString());
        }

        // Return "empty" angular config as fallback
        return { projects: [], defaultProject: '', newProjectRoot: '', version: 1, $schema: '' };
    }

}
