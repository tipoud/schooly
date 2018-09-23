import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IClassroom } from 'app/shared/model/classroom.model';
import { ClassroomService } from './classroom.service';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';

@Component({
    selector: 'jhi-classroom-update',
    templateUrl: './classroom-update.component.html'
})
export class ClassroomUpdateComponent implements OnInit {
    private _classroom: IClassroom;
    isSaving: boolean;

    teachers: ITeacher[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private classroomService: ClassroomService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ classroom }) => {
            this.classroom = classroom;
        });
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.classroom.id !== undefined) {
            this.subscribeToSaveResponse(this.classroomService.update(this.classroom));
        } else {
            this.subscribeToSaveResponse(this.classroomService.create(this.classroom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClassroom>>) {
        result.subscribe((res: HttpResponse<IClassroom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get classroom() {
        return this._classroom;
    }

    set classroom(classroom: IClassroom) {
        this._classroom = classroom;
    }
}
