import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';
import { EvaluationAttachmentService } from './evaluation-attachment.service';
import { EvaluationAttachmentComponent } from './evaluation-attachment.component';
import { EvaluationAttachmentDetailComponent } from './evaluation-attachment-detail.component';
import { EvaluationAttachmentUpdateComponent } from './evaluation-attachment-update.component';
import { EvaluationAttachmentDeletePopupComponent } from './evaluation-attachment-delete-dialog.component';
import { IEvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';

@Injectable({ providedIn: 'root' })
export class EvaluationAttachmentResolve implements Resolve<IEvaluationAttachment> {
    constructor(private service: EvaluationAttachmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((evaluationAttachment: HttpResponse<EvaluationAttachment>) => evaluationAttachment.body));
        }
        return of(new EvaluationAttachment());
    }
}

export const evaluationAttachmentRoute: Routes = [
    {
        path: 'evaluation-attachment',
        component: EvaluationAttachmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evaluation-attachment/:id/view',
        component: EvaluationAttachmentDetailComponent,
        resolve: {
            evaluationAttachment: EvaluationAttachmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evaluation-attachment/new',
        component: EvaluationAttachmentUpdateComponent,
        resolve: {
            evaluationAttachment: EvaluationAttachmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evaluation-attachment/:id/edit',
        component: EvaluationAttachmentUpdateComponent,
        resolve: {
            evaluationAttachment: EvaluationAttachmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluationAttachmentPopupRoute: Routes = [
    {
        path: 'evaluation-attachment/:id/delete',
        component: EvaluationAttachmentDeletePopupComponent,
        resolve: {
            evaluationAttachment: EvaluationAttachmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EvaluationAttachments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
