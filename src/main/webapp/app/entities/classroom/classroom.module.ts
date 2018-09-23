import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolySharedModule } from 'app/shared';
import {
    ClassroomComponent,
    ClassroomDetailComponent,
    ClassroomUpdateComponent,
    ClassroomDeletePopupComponent,
    ClassroomDeleteDialogComponent,
    classroomRoute,
    classroomPopupRoute
} from './';

const ENTITY_STATES = [...classroomRoute, ...classroomPopupRoute];

@NgModule({
    imports: [SchoolySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClassroomComponent,
        ClassroomDetailComponent,
        ClassroomUpdateComponent,
        ClassroomDeleteDialogComponent,
        ClassroomDeletePopupComponent
    ],
    entryComponents: [ClassroomComponent, ClassroomUpdateComponent, ClassroomDeleteDialogComponent, ClassroomDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolyClassroomModule {}
