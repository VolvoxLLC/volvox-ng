import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';

const routes: Routes = [
    {
        path: '',
        component: <%= classify(name) %>Page
    },
];

@NgModule({
    declarations: [ <%= classify(name) %>Page ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
})
export class <%= classify(name) %>Module {
}