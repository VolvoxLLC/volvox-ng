import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';<% if (createFacade){ %>
import { <%= classify(name) %>Facade } from '<%= facadeRelativePath %>';
import { <% if (!useClass) { %>I<% } %><%= classify(name) %>State } from '<%= facadeModelFolderRelativePath %>';<% } %>

@Component({
    selector: '<%= dasherize(prefix) %>-<%= dasherize(name) %>-dialog',
    templateUrl: './<%= dasherize(name) %>-dialog.component.html',
    styleUrls: [ './<%= dasherize(name) %>-dialog.component.<%= style %>' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>DialogComponent implements OnInit {
<% if (createFacade && useFacadeInTemplate) { %>
    public <%= camelize(name) %>State$: Observable<<% if (!useClass) { %>I<% } %><%= classify(name) %>State>;
<% } %>
    constructor(
        private myMatDialogRef: MatDialogRef<<%= classify(name) %>DialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,<% if (createFacade) {%>
        private my<%= classify(name) %>Facade: <%= classify(name) %>Facade<% } %>
    ) {
    }

    public ngOnInit(): void {<% if (createFacade) {%>
        this.<%= camelize(name) %>State$ = this.my<%= classify(name) %>Facade.subState();<% } %>
    }

}
