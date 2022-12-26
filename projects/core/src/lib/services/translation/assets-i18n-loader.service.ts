import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import { IKeyMap } from '../../models/key-map.model';
import { getRandomString } from '../../utils/commons.util';
import { TranslateCollectorService } from './translate-collector.service';

@Injectable({
    providedIn: 'root',
})
export class AssetsI18nLoaderService {

    protected priority: number = 0;
    protected supportedLanguages: string[];

    private subLanguages: Observable<unknown>;

    constructor(
        protected myTranslateCollectorService: TranslateCollectorService,
        protected myHttpClient: HttpClient,
    ) {
    }

    public init(path?: string, libName?: string, priority?: number): Promise<void> {
        return new Promise(async (resolve: () => void): Promise<void> => {
            if (this.supportedLanguages) {
                for (let i: number = 0; i < this.supportedLanguages.length; i++) {
                    await this.loadTranslations(this.supportedLanguages[ i ], path, libName, priority).toPromise();
                }
                resolve();
                return;
            }

            if (!this.subLanguages) {
                this.subLanguages = this.myHttpClient.get(`assets/i18n/supported-languages.json?v=${ getRandomString() }`)
                    .pipe(share());
            }
            this.subLanguages.subscribe(async (res: { languages: string[] }) => {
                this.subLanguages = null;
                this.supportedLanguages = res.languages;

                for (let i: number = 0; i < this.supportedLanguages.length; i++) {
                    await this.loadTranslations(this.supportedLanguages[ i ], path, libName, priority).toPromise();
                }
                resolve();
            }, () => {
                this.subLanguages = null;
                console.error('Missing file -> assets/i18n/supported-languages.json <-- FIX THIS!');
                resolve();
            });
        });
    }

    protected loadTranslations(lang: string, path?: string, libName?: string, priority?: number): Observable<unknown> {
        const filename: string = libName ? `${ libName }-${ lang }.json` : `${ lang }.json`;
        return this.myHttpClient.get(`${ (path || './assets/i18n/') + filename }?v=${ getRandomString() }`)
            .pipe(
                tap((response: IKeyMap<string>) =>
                    this.myTranslateCollectorService.addTranslations(response, lang, priority || this.priority)),
                catchError(() => {
                    console.error(`Missing file -> ${ filename } <-- FIX THIS!`);
                    return of(null);
                }),
            );
    }
}
