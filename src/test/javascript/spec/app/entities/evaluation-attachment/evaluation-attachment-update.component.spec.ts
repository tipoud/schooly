/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolyTestModule } from '../../../test.module';
import { EvaluationAttachmentUpdateComponent } from 'app/entities/evaluation-attachment/evaluation-attachment-update.component';
import { EvaluationAttachmentService } from 'app/entities/evaluation-attachment/evaluation-attachment.service';
import { EvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';

describe('Component Tests', () => {
    describe('EvaluationAttachment Management Update Component', () => {
        let comp: EvaluationAttachmentUpdateComponent;
        let fixture: ComponentFixture<EvaluationAttachmentUpdateComponent>;
        let service: EvaluationAttachmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [EvaluationAttachmentUpdateComponent]
            })
                .overrideTemplate(EvaluationAttachmentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EvaluationAttachmentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationAttachmentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EvaluationAttachment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.evaluationAttachment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EvaluationAttachment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.evaluationAttachment = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
