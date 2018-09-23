import { IStudent } from 'app/shared/model//student.model';
import { ITeacher } from 'app/shared/model//teacher.model';

export interface IClassroom {
    id?: number;
    level?: number;
    wording?: string;
    year?: number;
    active?: boolean;
    students?: IStudent[];
    teachers?: ITeacher[];
}

export class Classroom implements IClassroom {
    constructor(
        public id?: number,
        public level?: number,
        public wording?: string,
        public year?: number,
        public active?: boolean,
        public students?: IStudent[],
        public teachers?: ITeacher[]
    ) {
        this.active = this.active || false;
    }
}
