import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { buildRelativePath, ModuleOptions } from '@schematics/angular/utility/find-module';
import { IModuleContext } from '../models/module-context.model';

export class SchematicsImporter {

    private readonly tree: Tree;

    constructor(tree: Tree) {
        this.tree = tree;
    }

    public createSourceFile(path: string): ts.SourceFile {
        if (!path) {
            throw new SchematicsException('Given path is empty');
        }

        // Reading the module file
        const text: Buffer = this.tree.read(path);

        if (text === null) {
            throw new SchematicsException(`File ${path} does not exist.`);
        }

        return ts.createSourceFile(path, text.toString('utf-8'), ts.ScriptTarget.Latest, true);
    }

    public createRelativePath(srcPath: string, targetPath: string): string {
        return buildRelativePath(srcPath, targetPath);
    }

    public createDialogModuleContext(options: ModuleOptions): IModuleContext {
        const componentPath = `/${options.path}/${dasherize(options.name)}-dialog/${dasherize(options.name)}-dialog.module`;

        return {
            source: this.createSourceFile(options.module),
            relativePath: this.createRelativePath(options.module, componentPath),
            classifiedName: classify(`${options.name}Module`),
        };
    }

}
