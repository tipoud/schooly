/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolyTestModule } from '../../../test.module';
import { MarkComponent } from 'app/entities/mark/mark.component';
import { MarkService } from 'app/entities/mark/mark.service';
import { Mark } from 'app/shared/model/mark.model';

describe('Component Tests', () => {
    describe('Mark Management Component', () => {
        let comp: MarkComponent;
        let fixture: ComponentFixture<MarkComponent>;
        let service: MarkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [MarkComponent],
                providers: []
            })
                .overrideTemplate(MarkComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MarkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Mark(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.marks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
