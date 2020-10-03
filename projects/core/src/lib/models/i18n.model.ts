export enum I18nSupported {
    enUS = 'en-US',
}

export function mapI18n(data: any): II18n {
    return data as II18n;
}

export interface II18n {
    version: string;
    volvox: {
        components: {
            confirmDialog: {
                title: string;
                message: string;
            }
        }
        commons: {
            buttons: {
                save: string;
                deny: string;
                dismiss: string;
                confirm: string;
                cancel: string;
            }
        };
    };
}
