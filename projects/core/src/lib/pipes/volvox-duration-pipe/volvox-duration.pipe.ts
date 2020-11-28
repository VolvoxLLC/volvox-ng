import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { II18n } from '../../models/i18n.model';
import { VolvoxDurationFormat } from '../../models/volvox-duration.model';
import { isNullOrUndefined } from '../../utils/commons.util';
import { i18n } from '../../utils/i18n.util';

@Pipe({
    name: 'volvoxDuration',
})
export class VolvoxDurationPipe implements PipeTransform {

    private i18n: II18n = i18n;
    private store$: BehaviorSubject<number>;

    constructor(
        private readonly myTranslateService: TranslateService,
    ) {
        this.store$ = new BehaviorSubject<number>(null);
        this.store$.next(new Date().getTime());
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
        return this.store$.pipe(map((currentDate: number): string => this.calcDuration(currentDate, millis, format)));
    }

    private getSeconds(seconds: number): string {
        if (seconds === 1) {
            return `${ seconds } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.second) }`;
        }
        return `${ seconds } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.seconds) }`;
    }

    private getMinutes(minutes: number): string {
        if (minutes === 1) {
            return `${ minutes } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.second) }`;
        }
        return `${ minutes } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.seconds) }`;
    }

    private getHours(hours: number): string {
        if (hours === 1) {
            return `${ hours } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.second) }`;
        }
        return `${ hours } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.seconds) }`;
    }

    private getDays(days: number): string {
        if (days === 1) {
            return `${ days } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.second) }`;
        }
        return `${ days } ${ this.myTranslateService.instant(this.i18n.volvox.commons.dateTime.seconds) }`;
    }

    private calcDuration(currentDate: number, millis: number, format: VolvoxDurationFormat): string {
        if (isNullOrUndefined(millis)) {
            return null;
        }

        const seconds: number = millis / 1000;
        if (format === 'seconds') {
            return this.getSeconds(seconds);
        }

        const minutes: number = seconds / 60;
        if (format === 'minutes') {
            return this.getMinutes(minutes);
        }

        const hours: number = minutes / 60;
        if (format === 'hours') {
            return this.getHours(hours);
        }

        const days: number = hours / 24;
        if (format === 'days') {
            return this.getDays(days);
        }

        if (format === 'auto') {
            if (seconds < 60) {
                return this.getSeconds(seconds);
            }

            if (minutes < 60) {
                return this.getMinutes(minutes);
            }

            if (hours < 24) {
                return this.getHours(hours);
            }

            return this.getDays(days);
        }

        return null;
    }

}
