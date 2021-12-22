import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';<% if (createFacade){ %>
import { Observable } from 'rxjs';
import { <%= classify(name) %>Facade } from '<%= facadeRelativePath %>';
import { <% if (!useClass) { %>I<% } %><%= classify(name) %>State } from '<%= facadeModelFolderRelativePath %>';<% } %>

@Component({
    selector: '<%= dasherize(prefix) %>-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: [ './<%= dasherize(name) %>.component.<%= style %>' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Component implements OnInit {
<% if (createFacade && useFacadeInTemplate) { %>
    public <%= camelize(name) %>State$: Observable<<% if (!useClass) { %>I<% } %><%= classify(name) %>State>;
<% } %>
    constructor(<% if (createFacade) { %>private my<%= classify(name) %>Facade: <%= classify(name) %>Facade<% } %>) {
    }

    public ngOnInit(): void {<% if (createFacade) {%>
        this.<%= camelize(name) %>State$ = this.my<%= classify(name) %>Facade.subState();<% } %>
    }

}
