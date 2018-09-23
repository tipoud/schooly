import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMark } from 'app/shared/model/mark.model';
import { MarkService } from './mark.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation';

@Component({
    selector: 'jhi-mark-update',
    templateUrl: './mark-update.component.html'
})
export class MarkUpdateComponent implements OnInit {
    private _mark: IMark;
    isSaving: boolean;

    students: IStudent[];

    skills: ISkill[];

    evaluations: IEvaluation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private markService: MarkService,
        private studentService: StudentService,
        private skillService: SkillService,
        private evaluationService: EvaluationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mark }) => {
            this.mark = mark;
        });
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.skillService.query().subscribe(
            (res: HttpResponse<ISkill[]>) => {
                this.skills = res.body;
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
        if (this.mark.id !== undefined) {
            this.subscribeToSaveResponse(this.markService.update(this.mark));
        } else {
            this.subscribeToSaveResponse(this.markService.create(this.mark));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMark>>) {
        result.subscribe((res: HttpResponse<IMark>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }

    trackSkillById(index: number, item: ISkill) {
        return item.id;
    }

    trackEvaluationById(index: number, item: IEvaluation) {
        return item.id;
    }
    get mark() {
        return this._mark;
    }

    set mark(mark: IMark) {
        this._mark = mark;
    }
}
