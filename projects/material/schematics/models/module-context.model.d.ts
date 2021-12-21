import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

export interface IModuleContext {
    source: ts.SourceFile;
    relativePath: string;
    classifiedName: string;
}
