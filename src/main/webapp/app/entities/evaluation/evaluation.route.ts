import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from './evaluation.service';
import { EvaluationComponent } from './evaluation.component';
import { EvaluationDetailComponent } from './evaluation-detail.component';
import { EvaluationUpdateComponent } from './evaluation-update.component';
import { EvaluationDeletePopupComponent } from './evaluation-delete-dialog.component';
import { IEvaluation } from 'app/shared/model/evaluation.model';

@Injectable({ providedIn: 'root' })
export class EvaluationResolve implements Resolve<IEvaluation> {
    constructor(private service: EvaluationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((evaluation: HttpResponse<Evaluation>) => evaluation.body));
        }
        return of(new Evaluation());
    }
}

export const evaluationRoute: Routes = [
    {
        path: 'evaluation',
        component: EvaluationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evaluation/:id/view',
        component: EvaluationDetailComponent,
        resolve: {
            evaluation: EvaluationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evaluation/new',
        component: EvaluationUpdateComponent,
        resolve: {
            evaluation: EvaluationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evaluation/:id/edit',
        component: EvaluationUpdateComponent,
        resolve: {
            evaluation: EvaluationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluationPopupRoute: Routes = [
    {
        path: 'evaluation/:id/delete',
        component: EvaluationDeletePopupComponent,
        resolve: {
            evaluation: EvaluationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
