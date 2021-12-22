import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

describe('<%= classify(name) %>Component', (): void => {
    let component: <%= classify(name) %>Component;
    let fixture: ComponentFixture<<%= classify(name) %>Component>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [ <%= classify(name) %>Component ],
        })
            .compileComponents();
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(<%= classify(name) %>Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});
