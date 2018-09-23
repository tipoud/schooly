import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolySharedModule } from 'app/shared';
import {
    EvaluationAttachmentComponent,
    EvaluationAttachmentDetailComponent,
    EvaluationAttachmentUpdateComponent,
    EvaluationAttachmentDeletePopupComponent,
    EvaluationAttachmentDeleteDialogComponent,
    evaluationAttachmentRoute,
    evaluationAttachmentPopupRoute
} from './';

const ENTITY_STATES = [...evaluationAttachmentRoute, ...evaluationAttachmentPopupRoute];

@NgModule({
    imports: [SchoolySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EvaluationAttachmentComponent,
        EvaluationAttachmentDetailComponent,
        EvaluationAttachmentUpdateComponent,
        EvaluationAttachmentDeleteDialogComponent,
        EvaluationAttachmentDeletePopupComponent
    ],
    entryComponents: [
        EvaluationAttachmentComponent,
        EvaluationAttachmentUpdateComponent,
        EvaluationAttachmentDeleteDialogComponent,
        EvaluationAttachmentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolyEvaluationAttachmentModule {}
