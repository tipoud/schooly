import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMark } from 'app/shared/model/mark.model';
import { Principal } from 'app/core';
import { MarkService } from './mark.service';

@Component({
    selector: 'jhi-mark',
    templateUrl: './mark.component.html'
})
export class MarkComponent implements OnInit, OnDestroy {
    marks: IMark[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private markService: MarkService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.markService.query().subscribe(
            (res: HttpResponse<IMark[]>) => {
                this.marks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMarks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMark) {
        return item.id;
    }

    registerChangeInMarks() {
        this.eventSubscriber = this.eventManager.subscribe('markListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
