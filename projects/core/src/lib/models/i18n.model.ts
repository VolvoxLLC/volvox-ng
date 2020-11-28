export enum I18nSupported {
    enUS = 'en-US',
    deDE = 'de-DE',
    enGB = 'en-GB',
    frFR = 'fr-FR',
    esES = 'es-ES',
    ptPT = 'pt-PT',
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
            },
            updateDialog: {
                title: string;
                message: string;
            },
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
            dateTime: {
                second: string;
                seconds: string;
                minute: string;
                minutes: string;
                hour: string;
                hours: string;
                day: string;
                days: string;
            },
            logs: {
                error: {
                    label: string;
                    message: string;
                },
                success: {
                    label: string;
                    message: string;
                },
                warning: {
                    label: string;
                    message: string;
                },
                info: {
                    label: string;
                    message: string;
                },
            }
            buttons: {
                save: string;
                deny: string;
                dismiss: string;
                confirm: string;
                cancel: string;
                delete: string;
                accept: string;
                reloadNow: string;
                ignoreFor: string;
            }
        };
    };
}
