import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VolvoxDurationFormat } from '../../models/volvox-duration.model';

@Pipe({
    name: 'volvoxDuration',
})
export class VolvoxDurationPipe implements PipeTransform {

    private readonly store$: BehaviorSubject<number>;
    private readonly interval: NodeJS.Timer;

    constructor(
        private readonly myTranslateService: TranslateService,
    ) {
        this.store$ = new BehaviorSubject<number>(new Date().getTime());
        this.interval = setInterval(() => {
            this.store$.next(new Date().getTime());
        }, 1000);
        this.myTranslateService.onLangChange.subscribe((): void => {
            this.store$.next(new Date().getTime());
        });
    }

    /**
     * Converts a timestamp to a duration in the given format
     * @param millis
     * @param format
     * @returns
     * auto: 15000 -> 15 seconds
     * seconds: 15000 -> 15 seconds
     * minutes: 60000 -> 1 minute
     * hours: 7200000 -> 2 hours
     * days: 172800000 -> 2 days
     */
    public transform(millis: number, format: VolvoxDurationFormat = 'auto'): Observable<string> {
        return this.store$.pipe(
            map((currentDate: number): string => {
                if (!millis) {
                    clearInterval(this.interval);
                    return null;
                }

                if (millis - currentDate < 0) {
                    clearInterval(this.interval);
                    return null;
                }

                return this.calcDuration(currentDate, millis, format);
            }),
        );
    }


    private getTranslation(num: number, format: VolvoxDurationFormat): string {
        if (num === 1) {
            return `${ num.toFixed(0) } ${ this.myTranslateService.instant(`volvox.commons.dateTime[${ format }].label`) }`;
        }
        return `${ num.toFixed(0) } ${ this.myTranslateService.instant(`volvox.commons.dateTime[${ format }].plural.label`) }`;
    }


    private calcDuration(currentDate: number, millis: number, format: VolvoxDurationFormat): string {
        millis = millis - currentDate;

        const seconds: number = millis / 1000;
        if (format === 'seconds') {
            return this.getTranslation(seconds, 'seconds');
        }

        const minutes: number = seconds / 60;
        if (format === 'minutes') {
            return this.getTranslation(minutes, 'minutes');
        }

        const hours: number = minutes / 60;
        if (format === 'hours') {
            return this.getTranslation(hours, 'hours');
        }

        const days: number = hours / 24;
        if (format === 'days') {
            return this.getTranslation(days, 'days');
        }

        if (format === 'auto') {
            if (seconds < 60) {
                return this.getTranslation(seconds, 'seconds');
            }

            if (minutes < 60) {
                return this.getTranslation(minutes, 'minutes');
            }

            if (hours < 24) {
                return this.getTranslation(hours, 'hours');
            }

            return this.getTranslation(days, 'days');
        }

        return null;
    }
}
