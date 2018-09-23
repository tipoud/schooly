import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { IClassroom } from 'app/shared/model/classroom.model';
import { ClassroomService } from 'app/entities/classroom';

@Component({
    selector: 'jhi-student-update',
    templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
    private _student: IStudent;
    isSaving: boolean;

    classrooms: IClassroom[];
    birthdateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private studentService: StudentService,
        private classroomService: ClassroomService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.classroomService.query().subscribe(
            (res: HttpResponse<IClassroom[]>) => {
                this.classrooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
        result.subscribe((res: HttpResponse<IStudent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClassroomById(index: number, item: IClassroom) {
        return item.id;
    }
    get student() {
        return this._student;
    }

    set student(student: IStudent) {
        this._student = student;
    }
}
