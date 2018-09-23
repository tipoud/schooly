import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IArea } from 'app/shared/model/area.model';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area-update',
    templateUrl: './area-update.component.html'
})
export class AreaUpdateComponent implements OnInit {
    private _area: IArea;
    isSaving: boolean;

    constructor(private areaService: AreaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ area }) => {
            this.area = area;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.area.id !== undefined) {
            this.subscribeToSaveResponse(this.areaService.update(this.area));
        } else {
            this.subscribeToSaveResponse(this.areaService.create(this.area));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IArea>>) {
        result.subscribe((res: HttpResponse<IArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get area() {
        return this._area;
    }

    set area(area: IArea) {
        this._area = area;
    }
}
