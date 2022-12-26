import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
    name: 'volvoxDate',
})
export class VolvoxDatePipe implements PipeTransform {

    private readonly store$: BehaviorSubject<number>;
    private templates: { [ key: string ]: string };

    constructor(
        private readonly myTranslateService: TranslateService,
        private readonly myDatePipe: DatePipe,
    ) {
        this.store$ = new BehaviorSubject<number>(null);
        this.updateTemplates();
        setInterval((): void => {
            this.store$.next(new Date().getTime());
        }, 10);
        this.myTranslateService.onLangChange.subscribe((): void => {
            this.updateTemplates();
            this.store$.next(new Date().getTime());
        });
    }

    public transform(date: string | Date, mode: 'full' | 'timeSince' | 'date' = 'timeSince'): Observable<string> {
        return this.store$.pipe(map((currentDate: number): string => this.calcDate(currentDate, date, mode)));
    }

    private calcDate(currentDate: number, date: string | Date, mode: 'full' | 'timeSince' | 'date'): string {
        let parsed: number;
        if (date instanceof Date) {
            parsed = new Date(date.toString()).getTime();
        } else {
            parsed = new Date(date).getTime();
        }

        if (!currentDate) {
            currentDate = new Date().getTime();
        }

        const convertedDate = this.myDatePipe.transform(parsed, 'dd. MMM. yyyy hh:mm aaa');
        if (mode === 'full' || mode === 'timeSince') {
            const seconds = ((currentDate - parsed) * .001) >> 0;
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
        return this.templates[ key ] && this.templates[ key ].replace(/%d/i, String(Math.abs(Math.round(val))));
    }

    private updateTemplates(): void {
        this.templates = {
            prefix: this.myTranslateService.instant('volvox.pipes.timeSince.prefix'),
            suffix: this.myTranslateService.instant('volvox.pipes.timeSince.suffix'),
            seconds: this.myTranslateService.instant('volvox.pipes.timeSince.seconds'),
            minute: this.myTranslateService.instant('volvox.pipes.timeSince.minute'),
            minutes: this.myTranslateService.instant('volvox.pipes.timeSince.minutes'),
            hour: this.myTranslateService.instant('volvox.pipes.timeSince.hour'),
            hours: this.myTranslateService.instant('volvox.pipes.timeSince.hours'),
            day: this.myTranslateService.instant('volvox.pipes.timeSince.day'),
            days: this.myTranslateService.instant('volvox.pipes.timeSince.days'),
            month: this.myTranslateService.instant('volvox.pipes.timeSince.month'),
            months: this.myTranslateService.instant('volvox.pipes.timeSince.months'),
            year: this.myTranslateService.instant('volvox.pipes.timeSince.year'),
            years: this.myTranslateService.instant('volvox.pipes.timeSince.years'),
        };
    }

}
