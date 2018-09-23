/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolyTestModule } from '../../../test.module';
import { MarkUpdateComponent } from 'app/entities/mark/mark-update.component';
import { MarkService } from 'app/entities/mark/mark.service';
import { Mark } from 'app/shared/model/mark.model';

describe('Component Tests', () => {
    describe('Mark Management Update Component', () => {
        let comp: MarkUpdateComponent;
        let fixture: ComponentFixture<MarkUpdateComponent>;
        let service: MarkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolyTestModule],
                declarations: [MarkUpdateComponent]
            })
                .overrideTemplate(MarkUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MarkUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarkService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Mark(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mark = entity;
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
                    const entity = new Mark();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mark = entity;
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
