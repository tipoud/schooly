import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMark } from 'app/shared/model/mark.model';

@Component({
    selector: 'jhi-mark-detail',
    templateUrl: './mark-detail.component.html'
})
export class MarkDetailComponent implements OnInit {
    mark: IMark;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mark }) => {
            this.mark = mark;
        });
    }

    previousState() {
        window.history.back();
    }
}
