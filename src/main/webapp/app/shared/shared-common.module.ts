import { NgModule } from '@angular/core';

import { SchoolySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SchoolySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SchoolySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SchoolySharedCommonModule {}
