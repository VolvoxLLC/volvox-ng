import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as enUS from '../../assets/i18n/volvox-en-US.json';
import { Dictionary } from '../classes/dictionary';
import { I18nSupported, II18n, mapI18n } from '../models/i18n.model';

@Injectable({
    providedIn: 'root',
})
export class VolvoxTranslateService {

    constructor(
        private readonly myTranslateService: TranslateService,
    ) {
    }

    public get supportedLanguages(): Dictionary<I18nSupported, II18n> {
        return new Dictionary<I18nSupported, II18n>(
            {
                key: I18nSupported.enUS,
                value: mapI18n(enUS),
            }
        );
    }

    public useLang(lang: I18nSupported): Observable<II18n> {
        this.myTranslateService.setTranslation(lang.toString(), this.supportedLanguages.get(lang).value, true);
        return this.myTranslateService.use(lang.toString());
    }

}
