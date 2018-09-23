/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolyTestModule } from '../../../test.module';
import { EvaluationDeleteDialogComponent } from 'app/entities/evaluation/evaluation-delete-dialog.component';
import { EvaluationService } from 'app/entities/evaluation/evaluation.service';

describe('Component Tests', () => {
    describe('Evaluation Management Delete Component', () => {
        let comp: EvaluationDeleteDialogComponent;
        let fixture: ComponentFixture<EvaluationDeleteDialogComponent>;
        let service: EvaluationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [EvaluationDeleteDialogComponent]
            })
                .overrideTemplate(EvaluationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EvaluationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
