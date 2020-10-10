import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { i18n } from '../../classes/i18n';

@Pipe({
    name: 'volvoxDate',
})
export class VolvoxDatePipe implements PipeTransform {

    private store$: BehaviorSubject<number>;
    private templates: { [key: string]: string };

    constructor(
        private myDatePipe: DatePipe,
        private myTranslateService: TranslateService
    ) {
        this.store$ = new BehaviorSubject<number>(null);
        setInterval((): void => {
            this.store$.next(new Date().getTime());
        });
        this.updateTemplates();
        this.myTranslateService.onLangChange.subscribe((): void => {
            this.updateTemplates();
            this.store$.next(new Date().getTime());
        });
    }

    public transform(date: string | Date, mode: 'full' | 'timeSince' | 'date' = 'timeSince'): Observable<string> {
        return this.store$.pipe(map((currentDate: number): string => this.calcDate(currentDate, date, mode)));
    }

    private calcDate(currentDate: number, date: string | Date, mode: 'full' | 'timeSince' | 'date'): string {
        let parsed: Date;
        if (date instanceof Date) {
            parsed = new Date(date.toString().toUTC());
        } else {
            parsed = new Date(date.toUTC());
        }

        const convertedDate = this.myDatePipe.transform(parsed, 'dd. MMM. yyyy hh:mm aaa');
        if (mode === 'full' || mode === 'timeSince') {
            const seconds = ((currentDate - parsed.getTime()) * .001) >> 0;
            const minutes = seconds / 60;
            const hours = minutes / 60;
            const days = hours / 24;
            const years = days / 365;

            const timeSince: string = this.templates.prefix + (
                seconds < 60 && this.template('seconds', seconds) ||
                seconds < 120 && this.template('minute', 1) ||
                minutes < 60 && this.template('minutes', minutes) ||
                minutes < 120 && this.template('hour', 1) ||
                hours < 24 && this.template('hours', hours) ||
                hours < 42 && this.template('day', 1) ||
                days < 30 && this.template('days', days) ||
                days < 45 && this.template('month', 1) ||
                days < 365 && this.template('months', days / 30) ||
                years < 1.5 && this.template('year', 1) ||
                this.template('years', years)
            ) + this.templates.suffix;

            if (mode === 'timeSince') {
                return timeSince;
            }

            if (mode === 'full') {
                return `${ convertedDate } (${ timeSince })`;
            }
        }

        return convertedDate;
    }

    private template(key: string, val: number): string {
        return this.templates[key] && this.templates[key].replace(/%d/i, String(Math.abs(Math.round(val))));
    }

    private updateTemplates(): void {
        this.templates = {
            prefix: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.prefix),
            suffix: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.suffix),
            seconds: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.seconds),
            minute: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.minute),
            minutes: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.minutes),
            hour: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.hour),
            hours: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.hours),
            day: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.day),
            days: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.days),
            month: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.month),
            months: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.months),
            year: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.year),
            years: this.myTranslateService.instant(i18n.volvox.pipes.timeSince.years),
        };
    }

}
