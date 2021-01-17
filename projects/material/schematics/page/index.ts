import { normalize, strings } from '@angular-devkit/core';
import { apply, mergeWith, move, Rule, SchematicContext, Source, template, Tree, url } from '@angular-devkit/schematics';
import { IAngularConfig } from '../models/angular-config.model';
import { IComponentOptions } from '../models/options/component-options.model';
import { loadWorkspaceConfig, serializeComponentOptions } from '../utils/generation.util';

export function page(options: IComponentOptions): Rule {
    return (tree: Tree, context: SchematicContext): Tree => {
        let config: IComponentOptions = options;

        const angularConfig: IAngularConfig = loadWorkspaceConfig(tree);
        if (angularConfig) {
            config = serializeComponentOptions(config, angularConfig);
        }

        const sourceTemplate: Source = url('./files');
        const sourceParametrizeTemplate: Source = apply(sourceTemplate, [
            template({
               ...config,
               ...strings,
            }),
            move(normalize(config.path)),
        ]);

        tree = mergeWith(sourceParametrizeTemplate)(tree, context) as Tree;

        return tree;
    };
}