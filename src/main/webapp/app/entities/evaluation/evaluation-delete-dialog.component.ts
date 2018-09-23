import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from './evaluation.service';

@Component({
    selector: 'jhi-evaluation-delete-dialog',
    templateUrl: './evaluation-delete-dialog.component.html'
})
export class EvaluationDeleteDialogComponent {
    evaluation: IEvaluation;

    constructor(private evaluationService: EvaluationService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.evaluationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'evaluationListModification',
                content: 'Deleted an evaluation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evaluation-delete-popup',
    template: ''
})
export class EvaluationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ evaluation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EvaluationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.evaluation = evaluation;
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
