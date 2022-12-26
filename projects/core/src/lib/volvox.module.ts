import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AssetsI18nLoaderService } from './services/translation/assets-i18n-loader.service';

export function initI18n(i18n: AssetsI18nLoaderService): () => Promise<void> {
    return () => i18n.init(null, null, 1);
}

export function initI18nCore(i18n: AssetsI18nLoaderService): () => Promise<void> {
    return () => i18n.init(null, 'volvox');
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
})
export class VolvoxModule {

    public static forRoot(): ModuleWithProviders<VolvoxModule> {
        return {
            ngModule: VolvoxModule,
            providers: [
                { provide: APP_INITIALIZER, useFactory: initI18n, deps: [ AssetsI18nLoaderService ], multi: true },
                { provide: APP_INITIALIZER, useFactory: initI18nCore, deps: [ AssetsI18nLoaderService ], multi: true },
            ],
        };
    }

}
