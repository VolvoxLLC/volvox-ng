export <% if (!useClass) { %>interface I<% } else { %>class <% } %><%= classify(name) %>State {
}
