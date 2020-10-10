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
        },
        pipes: {
            timeSince: {
                prefix: string,
                suffix: string,
                seconds: string,
                minute: string,
                minutes: string,
                hour: string,
                hours: string,
                day: string,
                days: string,
                month: string,
                months: string,
                year: string,
                years: string,
            },
        },
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
