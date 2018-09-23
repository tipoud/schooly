import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { IUser, UserService } from 'app/core';
import { IClassroom } from 'app/shared/model/classroom.model';
import { ClassroomService } from 'app/entities/classroom';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation';

@Component({
    selector: 'jhi-teacher-update',
    templateUrl: './teacher-update.component.html'
})
export class TeacherUpdateComponent implements OnInit {
    private _teacher: ITeacher;
    isSaving: boolean;

    users: IUser[];

    classrooms: IClassroom[];

    subjects: ISubject[];

    evaluations: IEvaluation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherService,
        private userService: UserService,
        private classroomService: ClassroomService,
        private subjectService: SubjectService,
        private evaluationService: EvaluationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.classroomService.query().subscribe(
            (res: HttpResponse<IClassroom[]>) => {
                this.classrooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subjectService.query().subscribe(
            (res: HttpResponse<ISubject[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.evaluationService.query().subscribe(
            (res: HttpResponse<IEvaluation[]>) => {
                this.evaluations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackClassroomById(index: number, item: IClassroom) {
        return item.id;
    }

    trackSubjectById(index: number, item: ISubject) {
        return item.id;
    }

    trackEvaluationById(index: number, item: IEvaluation) {
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
    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacher) {
        this._teacher = teacher;
    }
}
