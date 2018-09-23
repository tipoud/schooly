/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolyTestModule } from '../../../test.module';
import { EvaluationDetailComponent } from 'app/entities/evaluation/evaluation-detail.component';
import { Evaluation } from 'app/shared/model/evaluation.model';

describe('Component Tests', () => {
    describe('Evaluation Management Detail Component', () => {
        let comp: EvaluationDetailComponent;
        let fixture: ComponentFixture<EvaluationDetailComponent>;
        const route = ({ data: of({ evaluation: new Evaluation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [EvaluationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EvaluationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EvaluationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.evaluation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
