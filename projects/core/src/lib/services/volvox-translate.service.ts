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

    private readonly cache: Dictionary<I18nSupported, any>;

    constructor(
        private readonly myTranslateService: TranslateService,
        private readonly myApiService: ApiService,
    ) {
        this.cache = new Dictionary<I18nSupported, any>();
    }

    public async merge(lang: I18nSupported): Promise<any> {
        if (this.cache.contains(lang)) {
            const cacheItem: IDictionaryItem<I18nSupported, any> = this.cache.get(lang);
            this.updateTranslation(lang, cacheItem.value);
            return cacheItem.value;
        }

        const data: any = await this.myApiService.getAsync<any>(`/assets/i18n/volvox-${ lang }.json`);
        this.cache.add(lang, data);
        return this.updateTranslation(lang, data).toPromise();
    }

    private updateTranslation(lang: I18nSupported, data: any): Observable<any> {
        this.myTranslateService.setTranslation(lang, data, true);
        return this.myTranslateService.use(lang);
    }

}
