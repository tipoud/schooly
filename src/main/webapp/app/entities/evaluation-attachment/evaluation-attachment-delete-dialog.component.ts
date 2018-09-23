import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';
import { EvaluationAttachmentService } from './evaluation-attachment.service';

@Component({
    selector: 'jhi-evaluation-attachment-delete-dialog',
    templateUrl: './evaluation-attachment-delete-dialog.component.html'
})
export class EvaluationAttachmentDeleteDialogComponent {
    evaluationAttachment: IEvaluationAttachment;

    constructor(
        private evaluationAttachmentService: EvaluationAttachmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.evaluationAttachmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'evaluationAttachmentListModification',
                content: 'Deleted an evaluationAttachment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evaluation-attachment-delete-popup',
    template: ''
})
export class EvaluationAttachmentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ evaluationAttachment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EvaluationAttachmentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.evaluationAttachment = evaluationAttachment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
