import { IAngularConfig } from '../models/angular-config/angular-config.model';
import { IAngularProject } from '../models/angular-config/angular-project.model';
import { IAngularSchematic } from '../models/angular-config/schematics/angular-schematic.model';
import { ICoreComponentSchematic } from '../models/angular-config/schematics/core-component-schematic.model';
import { ICoreFacadeSchematic } from '../models/angular-config/schematics/core-facade-schematic.model';
import { IBaseOptions } from '../models/options/base-options.model';
import { IComponentOptions } from '../models/options/component-options.model';
import { IDialogOptions } from '../models/options/dialog-options.model';
import { IFacadeOptions } from '../models/options/facade-options.model';
import { getValueOrDefault } from './get-value-or-default.util';

/**
 * Class to convert options passed to "readable" options.
 * Missing options will be filled and if no option was passed
 * default ones will be used
 */
export class SchematicsSerializer {

    private readonly angularConfig: IAngularConfig;

    constructor(angularConfig: IAngularConfig) {
        this.angularConfig = angularConfig;
    }

    /**
     * All options extend from the base options
     * Common options for schematics are serialized
     */
    public serializeBaseOptions(options: IBaseOptions): IBaseOptions {
        // Set default project from angular config if no project was passed
        if (!options.project) {
            options.project = this.angularConfig.defaultProject;
        }

        // For VSCode and maybe some other IDE's path is set a different way
        let appendPath: string = '';
        if (options.name) {
            const splitted: string[] = options.name.split('/');
            options.name = splitted.pop();
            appendPath += splitted.join('/');
        }

        // Get project config
        const projectConfig: IAngularProject = this.angularConfig.projects[ options.project ];
        if (projectConfig) {
            options.path = getValueOrDefault(options.path, [ `${projectConfig.sourceRoot}/${projectConfig.projectType === 'application' ? 'app' : 'lib'}` ], '/');
        }
        options.path += appendPath;

        return options;
    }

    /**
     * Serialize options for generating @sla-ng/core:component
     */
    public serializeComponentOptions(options: IComponentOptions): IComponentOptions {
        options = this.serializeBaseOptions(options);

        // Get project config
        const projectConfig: IAngularProject = this.angularConfig.projects[ options.project ];
        let coreComponentSchematics: ICoreComponentSchematic = {};
        let componentSchematics: IAngularSchematic = {};

        if (projectConfig?.schematics) {
            // Get default angular component configuration
            componentSchematics = projectConfig.schematics[ '@schematics/angular:component' ] as IAngularSchematic;

            // Get @sla-ng/core component configuration
            coreComponentSchematics = (projectConfig.schematics[ '@sla-ng/core:component' ] as ICoreComponentSchematic) || {};
        }

        options.style = getValueOrDefault(options.style, [ componentSchematics?.style ], 'css');
        options.skipTests = getValueOrDefault(options.skipTests, [ componentSchematics?.skipTests ], false);
        options.createFacade = getValueOrDefault(options.createFacade, [ options[ 'create-facade' ], coreComponentSchematics[ 'create-facade' ] ], false);
        options.facadeFolderPath = getValueOrDefault(options.facadeFolderPath, [ options[ 'facade-folder-path' ], coreComponentSchematics[ 'facade-folder-path' ] ], options.path);
        options.useFacadeInTemplate = getValueOrDefault(options.useFacadeInTemplate, [ options[ 'use-facade-in-template' ], coreComponentSchematics[ 'use-facade-in-template' ] ], false);
        options.prefix = getValueOrDefault(options.prefix, [ projectConfig?.prefix ], 'app');

        return options;
    }

    /**
     * Serialize options for generating @sla-ng/core:page
     */
    public serializeDialogOptions(options: IDialogOptions): IComponentOptions {
        options = this.serializeBaseOptions(options);

        // Get project config
        const projectConfig: IAngularProject = this.angularConfig.projects[ options.project ];
        let coreDialogSchematics: ICoreComponentSchematic = {};
        let componentSchematics: IAngularSchematic = {};

        if (projectConfig?.schematics) {
            // Get default angular component configuration
            componentSchematics = projectConfig.schematics[ '@schematics/angular:component' ] as IAngularSchematic;

            // Get @sla-ng/core dialog configuration
            coreDialogSchematics = (projectConfig.schematics[ '@sla-ng/core:dialog' ] as ICoreComponentSchematic) || {};
        }

        options.style = getValueOrDefault(options.style, [ componentSchematics?.style ], 'css');
        options.skipTests = getValueOrDefault(options.skipTests, [ componentSchematics?.skipTests ], false);
        options.createFacade = getValueOrDefault(options.createFacade, [ options[ 'create-facade' ], coreDialogSchematics[ 'create-facade' ] ], false);
        options.facadeFolderPath = getValueOrDefault(options.facadeFolderPath, [ options[ 'facade-folder-path' ], coreDialogSchematics[ 'facade-folder-path' ] ], options.path);
        options.useFacadeInTemplate = getValueOrDefault(options.useFacadeInTemplate, [ options[ 'use-facade-in-template' ], coreDialogSchematics[ 'use-facade-in-template' ] ], false);
        options.prefix = getValueOrDefault(options.prefix, [ projectConfig?.prefix ], 'app');

        return options;
    }

    /**
     * Serialize options for generating @sla-ng/core:page
     */
    public serializePageOptions(options: IComponentOptions): IComponentOptions {
        options = this.serializeBaseOptions(options);

        // Get project config
        const projectConfig: IAngularProject = this.angularConfig.projects[ options.project ];
        let coreComponentSchematics: ICoreComponentSchematic = {};
        let componentSchematics: IAngularSchematic = {};

        if (projectConfig?.schematics) {
            // Get default angular component configuration
            componentSchematics = projectConfig.schematics[ '@schematics/angular:component' ] as IAngularSchematic;

            // Get @sla-ng/core component configuration
            coreComponentSchematics = (projectConfig.schematics[ '@sla-ng/core:page' ] as ICoreComponentSchematic) || {};
        }

        options.style = getValueOrDefault(options.style, [ componentSchematics?.style ], 'css');
        options.skipTests = getValueOrDefault(options.skipTests, [ componentSchematics?.skipTests ], false);
        options.createFacade = getValueOrDefault(options.createFacade, [ options[ 'create-facade' ], coreComponentSchematics[ 'create-facade' ] ], false);
        options.facadeFolderPath = getValueOrDefault(options.facadeFolderPath, [ options[ 'facade-folder-path' ], coreComponentSchematics[ 'facade-folder-path' ] ], options.path);
        options.useFacadeInTemplate = getValueOrDefault(options.useFacadeInTemplate, [ options[ 'use-facade-in-template' ], coreComponentSchematics[ 'use-facade-in-template' ] ], false);
        options.prefix = getValueOrDefault(options.prefix, [ projectConfig?.prefix ], 'app');

        return options;
    }

    /**
     * Serialize options for generating @sla-ng/core:facade
     */
    public serializeFacadeOptions(options: IFacadeOptions): IFacadeOptions {
        options = this.serializeBaseOptions(options);

        // Get angular project configuration
        const projectConfig: IAngularProject = this.angularConfig.projects[ options.project ];
        let coreFacadeSchematics: ICoreFacadeSchematic = {};

        if (projectConfig?.schematics) {
            // Get @sla-ng/core facade configuration
            coreFacadeSchematics = (projectConfig.schematics[ '@sla-ng/core:facade' ] as ICoreFacadeSchematic) || {};
        }

        options.useClass = getValueOrDefault(options.useClass, [ options[ 'use-class' ], coreFacadeSchematics[ 'use-class' ] ], false);
        options.withSnapshot = getValueOrDefault(options.withSnapshot, [ options[ 'with-snapshot' ], coreFacadeSchematics[ 'with-snapshot' ] ], false);
        options.useSnapshotFunction = getValueOrDefault(options.useSnapshotFunction, [ options[ 'use-snapshot-function' ], coreFacadeSchematics[ 'use-snapshot-function' ] ], false);
        options.modelFolderPath = getValueOrDefault(options.modelFolderPath, [ options[ 'model-folder-path' ], coreFacadeSchematics[ 'model-folder-path' ] ], options.path);

        return options;
    }

    /**
     * Removes the last slash from a path
     * @param path
     */
    public removeLastSlash(path: string): string {
        return path.replace(/\/$/, '');
    }

}
