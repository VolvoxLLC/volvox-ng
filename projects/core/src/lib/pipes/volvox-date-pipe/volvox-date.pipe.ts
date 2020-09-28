import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'volvoxDate',
})
export class VolvoxDatePipe implements PipeTransform {

    constructor(private myDatePipe: DatePipe) {
    }

    public transform(date: string | Date, mode: 'full' | 'timeSince' | 'date' = 'timeSince'): string {
        let parsed: Date;
        if (date instanceof Date) {
            parsed = new Date(date.toString().toUTC());
        } else {
            parsed = new Date(date.toUTC());
        }

        const convertedDate = this.myDatePipe.transform(parsed, 'dd. MMM. yyyy hh:mm aaa');
        if (mode === 'full' || mode === 'timeSince') {
            const templates = {
                suffix: ' ago',
                seconds: 'less than a minute',
                minute: 'about a minute',
                minutes: '%d minutes',
                hour: 'about an hour',
                hours: 'about %d hours',
                day: 'a day',
                days: '%d days',
                month: 'about a month',
                months: '%d months',
                year: 'about a year',
                years: '%d years',
            };

            const template = (key: string, val: number): string => {
                return templates[key] && templates[key].replace(/%d/i, String(Math.abs(Math.round(val))));
            };

            const seconds = ((new Date().getTime() - parsed.getTime()) * .001) >> 0;
            const minutes = seconds / 60;
            const hours = minutes / 60;
            const days = hours / 24;
            const years = days / 365;

            const timeSince: string = (
                seconds < 45 && template('seconds', seconds) ||
                seconds < 90 && template('minute', 1) ||
                minutes < 45 && template('minutes', minutes) ||
                minutes < 90 && template('hour', 1) ||
                hours < 24 && template('hours', hours) ||
                hours < 42 && template('day', 1) ||
                days < 30 && template('days', days) ||
                days < 45 && template('month', 1) ||
                days < 365 && template('months', days / 30) ||
                years < 1.5 && template('year', 1) ||
                template('years', years)
            ) + templates.suffix;

            if (mode === 'timeSince') {
                return timeSince;
            }

            if (mode === 'full') {
                return `${ convertedDate } (${ timeSince })`;
            }
        }

        return convertedDate;
    }

}
