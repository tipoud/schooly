import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEvaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from './evaluation.service';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';

@Component({
    selector: 'jhi-evaluation-update',
    templateUrl: './evaluation-update.component.html'
})
export class EvaluationUpdateComponent implements OnInit {
    private _evaluation: IEvaluation;
    isSaving: boolean;

    teachers: ITeacher[];

    subjects: ISubject[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private evaluationService: EvaluationService,
        private teacherService: TeacherService,
        private subjectService: SubjectService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ evaluation }) => {
            this.evaluation = evaluation;
        });
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subjectService.query().subscribe(
            (res: HttpResponse<ISubject[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.evaluation.id !== undefined) {
            this.subscribeToSaveResponse(this.evaluationService.update(this.evaluation));
        } else {
            this.subscribeToSaveResponse(this.evaluationService.create(this.evaluation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluation>>) {
        result.subscribe((res: HttpResponse<IEvaluation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSubjectById(index: number, item: ISubject) {
        return item.id;
    }
    get evaluation() {
        return this._evaluation;
    }

    set evaluation(evaluation: IEvaluation) {
        this._evaluation = evaluation;
    }
}
