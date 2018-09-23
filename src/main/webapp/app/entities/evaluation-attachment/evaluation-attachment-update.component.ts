import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';
import { EvaluationAttachmentService } from './evaluation-attachment.service';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation';

@Component({
    selector: 'jhi-evaluation-attachment-update',
    templateUrl: './evaluation-attachment-update.component.html'
})
export class EvaluationAttachmentUpdateComponent implements OnInit {
    private _evaluationAttachment: IEvaluationAttachment;
    isSaving: boolean;

    evaluations: IEvaluation[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private evaluationAttachmentService: EvaluationAttachmentService,
        private evaluationService: EvaluationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ evaluationAttachment }) => {
            this.evaluationAttachment = evaluationAttachment;
        });
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
        if (this.evaluationAttachment.id !== undefined) {
            this.subscribeToSaveResponse(this.evaluationAttachmentService.update(this.evaluationAttachment));
        } else {
            this.subscribeToSaveResponse(this.evaluationAttachmentService.create(this.evaluationAttachment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluationAttachment>>) {
        result.subscribe(
            (res: HttpResponse<IEvaluationAttachment>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackEvaluationById(index: number, item: IEvaluation) {
        return item.id;
    }
    get evaluationAttachment() {
        return this._evaluationAttachment;
    }

    set evaluationAttachment(evaluationAttachment: IEvaluationAttachment) {
        this._evaluationAttachment = evaluationAttachment;
    }
}
