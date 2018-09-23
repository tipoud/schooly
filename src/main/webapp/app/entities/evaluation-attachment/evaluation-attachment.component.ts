import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';
import { Principal } from 'app/core';
import { EvaluationAttachmentService } from './evaluation-attachment.service';

@Component({
    selector: 'jhi-evaluation-attachment',
    templateUrl: './evaluation-attachment.component.html'
})
export class EvaluationAttachmentComponent implements OnInit, OnDestroy {
    evaluationAttachments: IEvaluationAttachment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private evaluationAttachmentService: EvaluationAttachmentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.evaluationAttachmentService.query().subscribe(
            (res: HttpResponse<IEvaluationAttachment[]>) => {
                this.evaluationAttachments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEvaluationAttachments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEvaluationAttachment) {
        return item.id;
    }

    registerChangeInEvaluationAttachments() {
        this.eventSubscriber = this.eventManager.subscribe('evaluationAttachmentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
