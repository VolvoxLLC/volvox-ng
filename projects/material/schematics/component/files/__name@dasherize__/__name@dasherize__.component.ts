import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@volvox-ng/material';

@Component({
    selector: '<%= dasherize(prefix) %>-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: [ './<%= dasherize(name) %>.component.<%= style %>' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Component extends BaseComponent implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

}
