import { SourceFile } from 'typescript';

export interface IModuleContext {
    source: SourceFile;
    relativePath: string;
    classifiedName: string;
}