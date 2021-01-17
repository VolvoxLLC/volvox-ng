import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { buildRelativePath, ModuleOptions } from '@schematics/angular/utility/find-module';
import { createSourceFile, ScriptTarget } from 'typescript';
import { IAngularConfig, IAngularProject } from '../models/angular-config.model';
import { IModuleContext } from '../models/module-context.model';
import { IBaseOptions } from '../models/options/base-options.model';
import { IComponentOptions } from '../models/options/component-options.model';
import { StyleSchema } from '../models/style-schema.model';

export function loadWorkspaceConfig(tree: Tree): IAngularConfig {
    const workspaceConfig: Buffer = tree.read('/angular.json') as Buffer;
    if (workspaceConfig) {
        return JSON.parse(workspaceConfig.toString());
    }
}

export function serializeBaseOptions(options: IBaseOptions, angularConfig: IAngularConfig): IBaseOptions {
    if (!options.project) {
        options.project = angularConfig.defaultProject;
    }

    let appendPath: string = '/';
    // Get path from name
    if (options.name) {
        const splitted = options.name.split('/');
        options.name = splitted.pop();
        appendPath += splitted.join('/');
    }

    // Get project config
    const projectConfig: IAngularProject = angularConfig.projects[ options.project ];
    if (projectConfig) {
        if (!options.path) {
            options.path = `${ projectConfig.sourceRoot }/${ projectConfig.projectType === 'application' ? 'app' : 'lib' }`;
        }
    }
    options.path += appendPath;

    return options;
}

export function serializeComponentOptions(options: IComponentOptions, angularConfig: IAngularConfig): IComponentOptions {
    options = serializeBaseOptions(options, angularConfig);

    // Get project config
    const projectConfig: IAngularProject = angularConfig.projects[ options.project ];
    if (projectConfig) {
        const style: StyleSchema = projectConfig.schematics[ '@schematics/angular:component' ]?.style || 'css';

        if (!options.style) {
            options.style = style;
        }

        if (!options.prefix) {
            options.prefix = projectConfig.prefix;
        }
    }
    return options;
}

export function createDialogModuleContext(host: Tree, options: ModuleOptions): IModuleContext {
    if (!options.module) {
        throw new SchematicsException('No module given');
    }

    // Reading the module file
    const text: Buffer = host.read(options.module);
    if (!text) {
        throw new SchematicsException(`File ${ options.module } does not exist.`);
    }

    const sourceText: string = text.toString();
    const componentPath: string = `/${ options.path }/${ dasherize(options.name) }-dialog/${ dasherize(options.name) }-dialog.module`;

    return {
        source: createSourceFile(options.module, sourceText, ScriptTarget.Latest, true),
        relativePath: buildRelativePath(options.module, componentPath),
        classifiedName: classify(`${ options.name }Module`),
    };
}