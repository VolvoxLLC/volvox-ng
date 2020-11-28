import { II18n } from '../models/i18n.model';

/**
 * Please set all translation keys here!
 */
export const i18n: II18n = {
    version: 'version',
    volvox: {
        components: {
            confirmDialog: {
                title: 'volvox.components.confirmDialog.title',
                message: 'volvox.components.confirmDialog.message',
            },
            updateDialog: {
                title: 'volvox.components.updateDialog.title',
                message: 'volvox.components.updateDialog.message',
            },
        },
        pipes: {
            timeSince: {
                prefix: 'volvox.pipes.timeSince.prefix',
                suffix: 'volvox.pipes.timeSince.suffix',
                seconds: 'volvox.pipes.timeSince.seconds',
                minute: 'volvox.pipes.timeSince.minute',
                minutes: 'volvox.pipes.timeSince.minutes',
                hour: 'volvox.pipes.timeSince.hour',
                hours: 'volvox.pipes.timeSince.hours',
                day: 'volvox.pipes.timeSince.day',
                days: 'volvox.pipes.timeSince.days',
                month: 'volvox.pipes.timeSince.month',
                months: 'volvox.pipes.timeSince.months',
                year: 'volvox.pipes.timeSince.year',
                years: 'volvox.pipes.timeSince.years',
            },
        },
        commons: {
            dateTime: {
                second: 'volvox.commons.dateTime.second',
                seconds: 'volvox.commons.dateTime.seconds',
                minute: 'volvox.commons.dateTime.minute',
                minutes: 'volvox.commons.dateTime.minutes',
                hour: 'volvox.commons.dateTime.hour',
                hours: 'volvox.commons.dateTime.hours',
                day: 'volvox.commons.dateTime.day',
                days: 'volvox.commons.dateTime.days',
            },
            logs: {
                error: {
                    label: 'volvox.commons.logs.error.label',
                    message: 'volvox.commons.logs.error.message',
                },
                success: {
                    label: 'volvox.commons.logs.success.label',
                    message: 'volvox.commons.logs.success.message',
                },
                warning: {
                    label: 'volvox.commons.logs.warning.label',
                    message: 'volvox.commons.logs.warning.message',
                },
                info: {
                    label: 'volvox.commons.logs.info.label',
                    message: 'volvox.commons.logs.info.message',
                },
            },
            buttons: {
                save: 'volvox.commons.buttons.save',
                deny: 'volvox.commons.buttons.deny',
                dismiss: 'volvox.commons.buttons.dismiss',
                confirm: 'volvox.commons.buttons.confirm',
                cancel: 'volvox.commons.buttons.cancel',
                delete: 'volvox.commons.buttons.delete',
                accept: 'volvox.commons.buttons.accept',
                reloadNow: 'volvox.commons.buttons.reloadNow',
                ignoreFor: 'volvox.commons.buttons.ignoreFor',
            },
        },
    },
};
