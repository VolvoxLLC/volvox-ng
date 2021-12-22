import { normalize, Path, strings } from '@angular-devkit/core';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply, filter, mergeWith, move, Rule, schematic, SchematicContext, Source, template, Tree, url } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { findModule } from '@schematics/angular/utility/find-module';
import { IAngularConfig } from '../models/angular-config/angular-config.model';
import { IModuleContext } from '../models/module-context.model';
import { IDialogOptions } from '../models/options/dialog-options.model';
import { IFacadeOptions } from '../models/options/facade-options.model';
import { DataLoader } from '../utils/data-loader.util';
import { SchematicsImporter } from '../utils/schematics-importer.util';
import { SchematicsSerializer } from '../utils/schematics-serializer.util';

export function dialog(options: IDialogOptions): Rule {
    return (tree: Tree, context: SchematicContext): Tree => {
        let config: IDialogOptions = options;

        const angularConfig: IAngularConfig = DataLoader.loadWorkspaceConfig(tree);
        const serializer: SchematicsSerializer = new SchematicsSerializer(angularConfig);
        const importer: SchematicsImporter = new SchematicsImporter(tree);
        config = serializer.serializeDialogOptions(config);

        let facadeOptions: IFacadeOptions;
        if (config.createFacade) {
            facadeOptions = serializer.serializeFacadeOptions({
                path: config.facadeFolderPath ? `/${serializer.removeLastSlash(config.facadeFolderPath)}` : config.path,
                name: config.name,
            });

            // Create a relative path for the facade import in the component
            config.facadeRelativePath = importer
                .createRelativePath(`/${serializer.removeLastSlash(normalize(config.path))}/${dasherize(config.name)}/${dasherize(config.name)}.dialog.ts`,
                    `/${serializer.removeLastSlash(normalize(config.facadeFolderPath || config.path))}/${dasherize(config.name)}.facade`);

            // Create a relative path for the model import in the component
            config.facadeModelFolderRelativePath = importer
                .createRelativePath(`/${serializer.removeLastSlash(normalize(config.path))}/${dasherize(config.name)}/${dasherize(config.name)}.dialog.ts`,
                    `/${serializer.removeLastSlash(normalize(facadeOptions.modelFolderPath || config.path))}/${dasherize(config.name)}-state.model`);
        }

        // Add import
        const modulePath: Path = findModule(tree, config.path);
        config.module = modulePath;
        const moduleContext: IModuleContext = new SchematicsImporter(tree).createDialogModuleContext(config);

        const importChanges = addImportToModule(moduleContext.source, modulePath, classify(options.name + 'DialogModule'), moduleContext.relativePath);

        const declarationRecorder = tree.beginUpdate(modulePath);
        for (const change of importChanges) {
            if (change instanceof InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(declarationRecorder);

        // Get template files
        const sourceTemplate: Source = url('./files');

        // Template rules with user given options and schematic utils
        // Filter out spec files, if given in options
        const rules: Rule[] = [
            filter((path: Path) => config.skipTests ? !path.endsWith('.spec.ts') : true),
            template({
                ...config,
                ...facadeOptions || {},
                ...strings,
            }),
            move(normalize(config.path)),
        ];

        // Create facade with dialog
        if (config.createFacade) {
            const facadeRule: Rule = schematic('facade', facadeOptions);
            rules.push(facadeRule);
        }

        const sourceParametrizeTemplate: Source = apply(sourceTemplate, rules);

        tree = mergeWith(sourceParametrizeTemplate)(tree, context) as Tree;

        return tree;
    };
}
