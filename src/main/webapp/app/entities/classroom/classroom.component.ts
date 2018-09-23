import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClassroom } from 'app/shared/model/classroom.model';
import { Principal } from 'app/core';
import { ClassroomService } from './classroom.service';

@Component({
    selector: 'jhi-classroom',
    templateUrl: './classroom.component.html'
})
export class ClassroomComponent implements OnInit, OnDestroy {
    classrooms: IClassroom[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classroomService: ClassroomService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.classroomService.query().subscribe(
            (res: HttpResponse<IClassroom[]>) => {
                this.classrooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClassrooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClassroom) {
        return item.id;
    }

    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe('classroomListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
