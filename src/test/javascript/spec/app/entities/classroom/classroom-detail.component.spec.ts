/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolyTestModule } from '../../../test.module';
import { ClassroomDetailComponent } from 'app/entities/classroom/classroom-detail.component';
import { Classroom } from 'app/shared/model/classroom.model';

describe('Component Tests', () => {
    describe('Classroom Management Detail Component', () => {
        let comp: ClassroomDetailComponent;
        let fixture: ComponentFixture<ClassroomDetailComponent>;
        const route = ({ data: of({ classroom: new Classroom(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [ClassroomDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClassroomDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClassroomDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.classroom).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
