import { normalize, strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply, mergeWith, move, Rule, SchematicContext, Source, template, Tree, url } from '@angular-devkit/schematics';
import { IAngularConfig } from '../models/angular-config/angular-config.model';
import { IFacadeOptions } from '../models/options/facade-options.model';
import { DataLoader } from '../utils/data-loader.util';
import { SchematicsImporter } from '../utils/schematics-importer.util';
import { SchematicsSerializer } from '../utils/schematics-serializer.util';

export function facade(options: IFacadeOptions): Rule {
    return (tree: Tree, context: SchematicContext): Tree => {
        let config: IFacadeOptions = options;

        const angularConfig: IAngularConfig = DataLoader.loadWorkspaceConfig(tree);
        const serializer: SchematicsSerializer = new SchematicsSerializer(angularConfig);
        const importer: SchematicsImporter = new SchematicsImporter(tree);
        config = serializer.serializeFacadeOptions(config);

        // Check for model path and create a relative path
        config.modelRelativePath = importer.createRelativePath(`/${serializer.removeLastSlash(normalize(config.path))}/${dasherize(config.name)}.facade.ts`,
            `/${serializer.removeLastSlash(normalize(config.modelFolderPath))}/${dasherize(config.name)}-state.model`);

        // Get template files
        const sourceTemplate: Source = url('./files');

        // Template rules with user given options and schematic utils
        const rules: Rule[] = [
            template({
                ...config,
                ...strings,
            }),
            move(normalize(config.path)),
        ];

        // Check if a specific model path was given
        if (config.modelFolderPath) {
            const srcModelFolderPath: string = normalize(`${config.path}/${dasherize(config.name)}-state.model.ts`);
            const targetModelFolderPath: string = normalize(`${config.modelFolderPath}/${dasherize(config.name)}-state.model.ts`);

            // Move model file to the passed path in options
            rules.push(move(srcModelFolderPath, targetModelFolderPath))
        }

        let sourceParametrizeTemplate: Source = apply(sourceTemplate, rules);
        tree = mergeWith(sourceParametrizeTemplate)(tree, context) as Tree;

        return tree;
    };
}
