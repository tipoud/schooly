import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolyAreaModule } from './area/area.module';
import { SchoolyStudentModule } from './student/student.module';
import { SchoolyMarkModule } from './mark/mark.module';
import { SchoolySkillModule } from './skill/skill.module';
import { SchoolyTeacherModule } from './teacher/teacher.module';
import { SchoolyClassroomModule } from './classroom/classroom.module';
import { SchoolySubjectModule } from './subject/subject.module';
import { SchoolyEvaluationModule } from './evaluation/evaluation.module';
import { SchoolyEvaluationAttachmentModule } from './evaluation-attachment/evaluation-attachment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SchoolyAreaModule,
        SchoolyStudentModule,
        SchoolyMarkModule,
        SchoolySkillModule,
        SchoolyTeacherModule,
        SchoolyClassroomModule,
        SchoolySubjectModule,
        SchoolyEvaluationModule,
        SchoolyEvaluationAttachmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolyEntityModule {}
