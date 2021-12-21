import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { <% if (!useClass) { %>I<% } %><%= classify(name) %>State } from '<%= modelRelativePath %>';

let _state: <% if (!useClass) { %>I<% } %><%= classify(name) %>State = {
};

@Injectable({
    providedIn: 'root',
})
export class <%= classify(name) %>Facade {

    protected store$: BehaviorSubject<<% if (!useClass) { %>I<% } %><%= classify(name) %>State> = new BehaviorSubject<<% if (!useClass) { %>I<% } %><%= classify(name) %>State>(_state);

    constructor() {
    }

    public subState(): Observable<<% if (!useClass) { %>I<% } %><%= classify(name) %>State> {
        return this.store$.asObservable();
    }
<% if (withSnapshot) { %>
    <% if (useSnapshotFunction) { %>public getStateSnapshot(): <% if (!useClass) { %>I<% } %><%= classify(name) %>State {
        return this.store$.value;
    }<% } else { %>public get snapshot(): <% if (!useClass) { %>I<% } %><%= classify(name) %>State {
        return this.store$.value;
    }<% } %>
<% } %>
    private updateState(state: <% if (!useClass) { %>I<% } %><%= classify(name) %>State): void {
        this.store$.next(_state = state);
    }

}
