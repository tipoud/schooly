import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mark } from 'app/shared/model/mark.model';
import { MarkService } from './mark.service';
import { MarkComponent } from './mark.component';
import { MarkDetailComponent } from './mark-detail.component';
import { MarkUpdateComponent } from './mark-update.component';
import { MarkDeletePopupComponent } from './mark-delete-dialog.component';
import { IMark } from 'app/shared/model/mark.model';

@Injectable({ providedIn: 'root' })
export class MarkResolve implements Resolve<IMark> {
    constructor(private service: MarkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mark: HttpResponse<Mark>) => mark.body));
        }
        return of(new Mark());
    }
}

export const markRoute: Routes = [
    {
        path: 'mark',
        component: MarkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mark/:id/view',
        component: MarkDetailComponent,
        resolve: {
            mark: MarkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mark/new',
        component: MarkUpdateComponent,
        resolve: {
            mark: MarkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mark/:id/edit',
        component: MarkUpdateComponent,
        resolve: {
            mark: MarkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const markPopupRoute: Routes = [
    {
        path: 'mark/:id/delete',
        component: MarkDeletePopupComponent,
        resolve: {
            mark: MarkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
