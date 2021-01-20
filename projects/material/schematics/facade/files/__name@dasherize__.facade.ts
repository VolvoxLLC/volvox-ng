import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { I<%= classify(name) %>State } from './<%= dasherize(name) %>-state.model';

let _state: I<%= classify(name) %>State = {
};

@Injectable({
    providedIn: 'root',
})
export class <%= classify(name) %>Facade {

    protected store$: BehaviorSubject<I<%= classify(name) %>State>;

    constructor() {
        this.store$ = new BehaviorSubject<I<%= classify(name) %>State>(_state);
    }

    public subState(): Observable<I<%= classify(name) %>State> {
        return this.store$.asObservable();
    }

    public get snapshot(): I<%= classify(name) %>State {
        return this.store$.value;
    }

    private updateState(state: I<%= classify(name) %>State): void {
        this.store$.next(_state = state);
    }
}