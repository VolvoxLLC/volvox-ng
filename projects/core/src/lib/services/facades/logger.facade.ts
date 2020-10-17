import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoggerState } from '../../models/facades/logger-state.model';
import { ILogger } from '../../models/logger-config.model';

let _state: ILoggerState = {
    logs: [],
};

@Injectable({
    providedIn: 'root',
})
export class LoggerFacade {

    public store$: BehaviorSubject<ILoggerState>;

    constructor() {
        this.store$ = new BehaviorSubject<ILoggerState>(_state);
    }

    public get snapshot(): ILoggerState {
        return this.store$.value;
    }

    public updateLogs(logs: ILogger[]): void {
        this.updateState({ ..._state, logs });
    }

    private updateState(state: ILoggerState): void {
        this.store$.next(_state = state);
    }

}
