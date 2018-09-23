/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolyTestModule } from '../../../test.module';
import { MarkDetailComponent } from 'app/entities/mark/mark-detail.component';
import { Mark } from 'app/shared/model/mark.model';

describe('Component Tests', () => {
    describe('Mark Management Detail Component', () => {
        let comp: MarkDetailComponent;
        let fixture: ComponentFixture<MarkDetailComponent>;
        const route = ({ data: of({ mark: new Mark(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [MarkDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MarkDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MarkDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mark).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
