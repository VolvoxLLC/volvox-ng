import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoggerState } from '../../models/facades/logger-state.model';
import { ILog } from '../../models/logger-config.model';

let _state: ILoggerState = {
    logs: [],
};

@Injectable({
    providedIn: 'root',
})
export class LoggerFacade {

    protected store$: BehaviorSubject<ILoggerState>;

    constructor() {
        this.store$ = new BehaviorSubject<ILoggerState>(_state);
    }

    public get snapshot(): ILoggerState {
        return this.store$.value;
    }

    public subState(): Observable<ILoggerState> {
        return this.store$.asObservable();
    }

    public updateLogs(logs: ILog[]): void {
        this.updateState({ ..._state, logs });
    }

    private updateState(state: ILoggerState): void {
        this.store$.next(_state = state);
    }

}
