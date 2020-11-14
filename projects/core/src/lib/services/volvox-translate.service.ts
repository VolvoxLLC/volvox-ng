import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { I18nSupported, II18n } from '../models/i18n.model';
import { ApiService } from './api.service';
import { Dictionary } from '../utils/dictionary.util';
import { IDictionaryItem } from '../models/dictionary-item.model';

@Injectable({
    providedIn: 'root',
})
export class VolvoxTranslateService {

    private readonly cache: Dictionary<I18nSupported, II18n>;

    constructor(
        private readonly myTranslateService: TranslateService,
        private readonly myApiService: ApiService,
    ) {
        this.cache = new Dictionary<I18nSupported, II18n>();
    }

    public async merge(lang: I18nSupported): Promise<II18n> {
        if (this.cache.contains(lang)) {
            const cacheItem: IDictionaryItem<I18nSupported, II18n> = this.cache.get(lang);
            this.updateTranslation(lang, cacheItem.value);
            return cacheItem.value;
        }

        const data: II18n = await this.myApiService.get<II18n>(`/assets/i18n/volvox-${ lang }.json`).toPromise()
        this.cache.add(lang, data);
        return this.updateTranslation(lang, data).toPromise();
    }

    private updateTranslation(lang: I18nSupported, data: II18n): Observable<II18n> {
        this.myTranslateService.setTranslation(lang, data, true);
        return this.myTranslateService.use(lang);
    }

}
