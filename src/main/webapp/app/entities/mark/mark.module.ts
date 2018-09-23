import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolySharedModule } from 'app/shared';
import {
    MarkComponent,
    MarkDetailComponent,
    MarkUpdateComponent,
    MarkDeletePopupComponent,
    MarkDeleteDialogComponent,
    markRoute,
    markPopupRoute
} from './';

const ENTITY_STATES = [...markRoute, ...markPopupRoute];

@NgModule({
    imports: [SchoolySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MarkComponent, MarkDetailComponent, MarkUpdateComponent, MarkDeleteDialogComponent, MarkDeletePopupComponent],
    entryComponents: [MarkComponent, MarkUpdateComponent, MarkDeleteDialogComponent, MarkDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolyMarkModule {}
