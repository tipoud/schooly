/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolyTestModule } from '../../../test.module';
import { EvaluationAttachmentDetailComponent } from 'app/entities/evaluation-attachment/evaluation-attachment-detail.component';
import { EvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';

describe('Component Tests', () => {
    describe('EvaluationAttachment Management Detail Component', () => {
        let comp: EvaluationAttachmentDetailComponent;
        let fixture: ComponentFixture<EvaluationAttachmentDetailComponent>;
        const route = ({ data: of({ evaluationAttachment: new EvaluationAttachment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [EvaluationAttachmentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EvaluationAttachmentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EvaluationAttachmentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.evaluationAttachment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
