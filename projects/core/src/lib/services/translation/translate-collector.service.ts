import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { VOLVOX_MERGED_TRANSLATION } from '../../constants/local-storage.constant';
import { IKeyMap } from '../../models/key-map.model';
import { isNullOrUndefined } from '../../utils/commons.util';

export interface ITranslationMap {
    priority: number;
    translation: IKeyMap<string>;
}

@Injectable({
    providedIn: 'root',
})
export class TranslateCollectorService {

    private translationMap: IKeyMap<ITranslationMap[]> = {};

    constructor(private readonly myTranslateService: TranslateService) {
    }

    public addTranslations(translation: IKeyMap<string>, lang: string, priority: number): void {
        if (isNullOrUndefined(this.translationMap[ lang ])) {
            this.translationMap[ lang ] = [];
        }

        this.translationMap[ lang ].push({ priority, translation });
        this.translationMap[ lang ].sort((a: ITranslationMap, b: ITranslationMap) => a.priority - b.priority);
        const merged: IKeyMap<string> = JSON.parse(localStorage.getItem(VOLVOX_MERGED_TRANSLATION(lang))) || {};

        for (const translationsData of this.translationMap[ lang ]) {
            const translations: IKeyMap<string> = translationsData.translation;
            if (translations != null) {
                Object.keys(translations).forEach((key: string) => void (merged[ key ] = translations[ key ]));
            }
        }

        let trans: boolean = true;
        let count: number = 0;
        while (trans) {
            count++;
            trans = false;
            if (count >= 10) {
                console.warn('Limit reached! Please check translation file! Last replaced values:');
            }
            Object.keys(merged).forEach((key: string) => {
                if (merged[ key ].startsWith('@:')) {
                    merged[ key ] = merged[ merged[ key ].substring(2, merged[ key ].length) ];
                    trans = count < 10;
                    if (count > 10) {
                        console.warn(merged[ key ]);
                    }
                }
            });
        }
        localStorage.setItem(VOLVOX_MERGED_TRANSLATION(lang), JSON.stringify(merged));
        this.myTranslateService.reloadLang(lang);
    }

}
