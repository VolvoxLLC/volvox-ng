import { ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name) %>DialogComponent } from './<%= dasherize(name) %>-dialog.component';

describe('<%= classify(name) %>DialogComponent', (): void => {
    let component: <%= classify(name) %>DialogComponent;
    let fixture: ComponentFixture<<%= classify(name) %>DialogComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [ <%= classify(name) %>DialogComponent ],
        })
            .compileComponents();
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(<%= classify(name) %>DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});
