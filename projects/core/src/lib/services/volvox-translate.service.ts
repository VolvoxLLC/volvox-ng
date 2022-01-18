import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { I18nSupported } from '../enums/i18n-supported.enum';
import { IDictionaryItem } from '../models/dictionary-item.model';
import { Dictionary } from '../utils/dictionary.util';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class VolvoxTranslateService {

    private readonly cache: Dictionary<I18nSupported, { [ key: string ]: string }>;

    constructor(
        private readonly myTranslateService: TranslateService,
        private readonly myApiService: ApiService,
    ) {
        this.cache = new Dictionary<I18nSupported, { [ key: string ]: string }>();
    }

    public async merge(lang: I18nSupported): Promise<void> {
        if (this.cache.contains(lang)) {
            const cacheItem: IDictionaryItem<I18nSupported, { [ key: string ]: string }> = this.cache.get(lang);
            this.updateTranslation(lang, cacheItem.value);
            cacheItem.value;
        }

        const data: { [ key: string ]: string } = await this.myApiService.getAsync<{ [ key: string ]: string }>(`/assets/i18n/volvox-${ lang }.json`);
        this.cache.add(lang, data);
        this.updateTranslation(lang, data);
    }

    /**
     * Generate constant
     * @param lang
     * @param prefix
     */
    public async generateI18nConst(lang: I18nSupported, prefix?: string): Promise<void> {
        const result: { [ key: string ]: string } = {};
        if (prefix) {
            prefix = `${ prefix }-`;
        }
        const json: { [ key: string ]: string } = await this.myApiService.get<{ [ key: string ]: string }>(`../../assets/i18n/${ prefix }${ lang }.json`).toPromise();

        // eslint-disable-next-line guard-for-in
        for (const objectPath in json) {
            const parts: string[] = objectPath.split('.');

            let target: { [ key: string ]: string } | {} = result;
            const targets = [];
            while (parts.length > 1) {
                const part: string = parts.shift();
                target = target[ part ] = target[ part ] || {};
                targets.push(part);
            }

            target[ parts[ 0 ] ] = objectPath;
        }

        let parsedJSON = JSON.stringify(result, null, 4);

        // Remove quotes from property names
        parsedJSON = parsedJSON.replace(/"([^"]+)":/g, '$1:');

        // Add commas
        parsedJSON = parsedJSON.replace(/}/g, '},');

        // Replace double quotes with single ones
        parsedJSON = parsedJSON.replace(/"/g, '\'');

        // Add comma after single quotes
        parsedJSON = parsedJSON.replace(/'([^']+)'/g, '\'$1\',');

        // Remove duplicate commas
        parsedJSON = parsedJSON.replace(/,,/g, ',');

        // Remove last comma
        parsedJSON = parsedJSON.substring(0, parsedJSON.length - 1);

        // Add semicolon
        parsedJSON += ';';

        const resultString = `export const i18nApp: II18nApp = ${ parsedJSON }`;

        console.log(resultString);
    }

    /**
     * Generate model
     * @param lang
     * @param prefix
     */
    public async generateI18nModel(lang: I18nSupported, prefix?: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = {};
        if (prefix) {
            prefix = `${ prefix }-`;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const json: any = await this.myApiService.get(`../../assets/i18n/${ prefix }${ lang }.json`).toPromise();

        // eslint-disable-next-line guard-for-in
        for (const objectPath in json) {
            const parts: string[] = objectPath.split('.');

            let target = result;
            while (parts.length > 1) {
                const part = parts.shift();
                target = target[ part ] = target[ part ] || {};
            }

            target[ parts[ 0 ] ] = json[ objectPath ];
        }

        let parsedJSON = JSON.stringify(result, null, 4);
        // Remove quotes from property names
        parsedJSON = parsedJSON.replace(/"([^"]+)":/g, '$1:');

        // Remove commas
        parsedJSON = parsedJSON.replace(/,/g, '');

        // Add typedef
        parsedJSON = parsedJSON.replace(/".*?"/g, 'string;');

        const resultString = `export interface II18nApp ${ parsedJSON }`;

        console.log(resultString);
    }

    private updateTranslation(lang: I18nSupported, data: { [ key: string ]: string }): void {
        this.myTranslateService.setTranslation(lang, { ...data }, true);
    }

}
