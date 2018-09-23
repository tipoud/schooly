import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Area } from 'app/shared/model/area.model';
import { AreaService } from './area.service';
import { AreaComponent } from './area.component';
import { AreaDetailComponent } from './area-detail.component';
import { AreaUpdateComponent } from './area-update.component';
import { AreaDeletePopupComponent } from './area-delete-dialog.component';
import { IArea } from 'app/shared/model/area.model';

@Injectable({ providedIn: 'root' })
export class AreaResolve implements Resolve<IArea> {
    constructor(private service: AreaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((area: HttpResponse<Area>) => area.body));
        }
        return of(new Area());
    }
}

export const areaRoute: Routes = [
    {
        path: 'area',
        component: AreaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Areas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'area/:id/view',
        component: AreaDetailComponent,
        resolve: {
            area: AreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Areas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'area/new',
        component: AreaUpdateComponent,
        resolve: {
            area: AreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Areas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'area/:id/edit',
        component: AreaUpdateComponent,
        resolve: {
            area: AreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Areas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const areaPopupRoute: Routes = [
    {
        path: 'area/:id/delete',
        component: AreaDeletePopupComponent,
        resolve: {
            area: AreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Areas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
