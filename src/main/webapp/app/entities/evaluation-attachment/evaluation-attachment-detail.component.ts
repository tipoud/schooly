import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';

@Component({
    selector: 'jhi-evaluation-attachment-detail',
    templateUrl: './evaluation-attachment-detail.component.html'
})
export class EvaluationAttachmentDetailComponent implements OnInit {
    evaluationAttachment: IEvaluationAttachment;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ evaluationAttachment }) => {
            this.evaluationAttachment = evaluationAttachment;
        });
    }

    previousState() {
        window.history.back();
    }
}
