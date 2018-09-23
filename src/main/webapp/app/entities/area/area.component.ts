import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArea } from 'app/shared/model/area.model';
import { Principal } from 'app/core';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area',
    templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit, OnDestroy {
    areas: IArea[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private areaService: AreaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.areaService.query().subscribe(
            (res: HttpResponse<IArea[]>) => {
                this.areas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAreas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IArea) {
        return item.id;
    }

    registerChangeInAreas() {
        this.eventSubscriber = this.eventManager.subscribe('areaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
