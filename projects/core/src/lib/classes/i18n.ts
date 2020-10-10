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
            buttons: {
                save: 'volvox.commons.buttons.save',
                deny: 'volvox.commons.buttons.deny',
                dismiss: 'volvox.commons.buttons.dismiss',
                confirm: 'volvox.commons.buttons.confirm',
                cancel: 'volvox.commons.buttons.cancel',
            },
        },
    },
};
