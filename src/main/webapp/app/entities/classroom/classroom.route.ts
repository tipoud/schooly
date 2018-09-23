import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classroom } from 'app/shared/model/classroom.model';
import { ClassroomService } from './classroom.service';
import { ClassroomComponent } from './classroom.component';
import { ClassroomDetailComponent } from './classroom-detail.component';
import { ClassroomUpdateComponent } from './classroom-update.component';
import { ClassroomDeletePopupComponent } from './classroom-delete-dialog.component';
import { IClassroom } from 'app/shared/model/classroom.model';

@Injectable({ providedIn: 'root' })
export class ClassroomResolve implements Resolve<IClassroom> {
    constructor(private service: ClassroomService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((classroom: HttpResponse<Classroom>) => classroom.body));
        }
        return of(new Classroom());
    }
}

export const classroomRoute: Routes = [
    {
        path: 'classroom',
        component: ClassroomComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classrooms'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classroom/:id/view',
        component: ClassroomDetailComponent,
        resolve: {
            classroom: ClassroomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classrooms'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classroom/new',
        component: ClassroomUpdateComponent,
        resolve: {
            classroom: ClassroomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classrooms'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'classroom/:id/edit',
        component: ClassroomUpdateComponent,
        resolve: {
            classroom: ClassroomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classrooms'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classroomPopupRoute: Routes = [
    {
        path: 'classroom/:id/delete',
        component: ClassroomDeletePopupComponent,
        resolve: {
            classroom: ClassroomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Classrooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
