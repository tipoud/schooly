/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolyTestModule } from '../../../test.module';
import { MarkDeleteDialogComponent } from 'app/entities/mark/mark-delete-dialog.component';
import { MarkService } from 'app/entities/mark/mark.service';

describe('Component Tests', () => {
    describe('Mark Management Delete Component', () => {
        let comp: MarkDeleteDialogComponent;
        let fixture: ComponentFixture<MarkDeleteDialogComponent>;
        let service: MarkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [MarkDeleteDialogComponent]
            })
                .overrideTemplate(MarkDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MarkDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkService);
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
