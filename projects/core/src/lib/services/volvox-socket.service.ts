import { Injectable } from '@angular/core';

import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VolvoxSocketService {

    private subject: Subject<MessageEvent>;

    constructor() {
    }

    public connect(url: string): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    }

    public send(data: MessageEvent): void {
        this.subject.next(data);
    }

    private create(url: string): Subject<MessageEvent> {
        const ws = new WebSocket(url);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const observable = new Observable((obs: Observer<MessageEvent>): any => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        const observer = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            next: (data: any): void => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };
        return Subject.create(observer, observable);
    }

}
