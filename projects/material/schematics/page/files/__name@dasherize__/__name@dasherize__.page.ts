import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@volvox-ng/material';

@Component({
    selector: '<%= dasherize(prefix) %>-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.page.html',
    styleUrls: [ './<%= dasherize(name) %>.page.<%= style %>' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Page extends BaseComponent implements OnInit {

    constructor() {
    }

    public ngOnInit(): void {
    }

}
