import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClassroom } from 'app/shared/model/classroom.model';

@Component({
    selector: 'jhi-classroom-detail',
    templateUrl: './classroom-detail.component.html'
})
export class ClassroomDetailComponent implements OnInit {
    classroom: IClassroom;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ classroom }) => {
            this.classroom = classroom;
        });
    }

    previousState() {
        window.history.back();
    }
}
