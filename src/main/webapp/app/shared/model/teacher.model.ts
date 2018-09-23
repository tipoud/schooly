import { IClassroom } from 'app/shared/model//classroom.model';
import { ISubject } from 'app/shared/model//subject.model';

export interface ITeacher {
    id?: number;
    lastname?: string;
    firstname?: string;
    userId?: number;
    classrooms?: IClassroom[];
    subjects?: ISubject[];
    evaluationId?: number;
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public lastname?: string,
        public firstname?: string,
        public userId?: number,
        public classrooms?: IClassroom[],
        public subjects?: ISubject[],
        public evaluationId?: number
    ) {}
}
