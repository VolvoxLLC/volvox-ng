import { ComponentFixture, TestBed } from '@angular/core/testing';
import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';

describe('<%= classify(name) %>Page', (): void => {
    let component: <%= classify(name) %>Page;
    let fixture: ComponentFixture<<%= classify(name) %>Page>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            declarations: [ <%= classify(name) %>Page ],
        })
            .compileComponents();
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(<%= classify(name) %>Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});