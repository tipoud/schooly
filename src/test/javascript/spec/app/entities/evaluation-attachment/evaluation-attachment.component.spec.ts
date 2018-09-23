/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolyTestModule } from '../../../test.module';
import { EvaluationAttachmentComponent } from 'app/entities/evaluation-attachment/evaluation-attachment.component';
import { EvaluationAttachmentService } from 'app/entities/evaluation-attachment/evaluation-attachment.service';
import { EvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';

describe('Component Tests', () => {
    describe('EvaluationAttachment Management Component', () => {
        let comp: EvaluationAttachmentComponent;
        let fixture: ComponentFixture<EvaluationAttachmentComponent>;
        let service: EvaluationAttachmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [EvaluationAttachmentComponent],
                providers: []
            })
                .overrideTemplate(EvaluationAttachmentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EvaluationAttachmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationAttachmentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EvaluationAttachment(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.evaluationAttachments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
