/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolyTestModule } from '../../../test.module';
import { ClassroomDeleteDialogComponent } from 'app/entities/classroom/classroom-delete-dialog.component';
import { ClassroomService } from 'app/entities/classroom/classroom.service';

describe('Component Tests', () => {
    describe('Classroom Management Delete Component', () => {
        let comp: ClassroomDeleteDialogComponent;
        let fixture: ComponentFixture<ClassroomDeleteDialogComponent>;
        let service: ClassroomService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [ClassroomDeleteDialogComponent]
            })
                .overrideTemplate(ClassroomDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClassroomDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomService);
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
