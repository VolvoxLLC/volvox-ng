import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    public canDeactivate(component: CanComponentDeactivate): boolean {
        return component.canDeactivate ? component.canDeactivate() as boolean : true;
    }

}
