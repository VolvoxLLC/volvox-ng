import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, '/assets/i18n/volvox-');
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
            isolate: false,
        }),
    ],
    providers: [
        TranslateService,
    ],
    exports: [
        TranslateModule,
    ],
})
export class VolvoxModule {
}
