import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolySharedModule } from 'app/shared';
import {
    EvaluationComponent,
    EvaluationDetailComponent,
    EvaluationUpdateComponent,
    EvaluationDeletePopupComponent,
    EvaluationDeleteDialogComponent,
    evaluationRoute,
    evaluationPopupRoute
} from './';

const ENTITY_STATES = [...evaluationRoute, ...evaluationPopupRoute];

@NgModule({
    imports: [SchoolySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EvaluationComponent,
        EvaluationDetailComponent,
        EvaluationUpdateComponent,
        EvaluationDeleteDialogComponent,
        EvaluationDeletePopupComponent
    ],
    entryComponents: [EvaluationComponent, EvaluationUpdateComponent, EvaluationDeleteDialogComponent, EvaluationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolyEvaluationModule {}
