/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolyTestModule } from '../../../test.module';
import { ClassroomComponent } from 'app/entities/classroom/classroom.component';
import { ClassroomService } from 'app/entities/classroom/classroom.service';
import { Classroom } from 'app/shared/model/classroom.model';

describe('Component Tests', () => {
    describe('Classroom Management Component', () => {
        let comp: ClassroomComponent;
        let fixture: ComponentFixture<ClassroomComponent>;
        let service: ClassroomService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [ClassroomComponent],
                providers: []
            })
                .overrideTemplate(ClassroomComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClassroomComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Classroom(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.classrooms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
