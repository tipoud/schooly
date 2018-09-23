import { Moment } from 'moment';
import { IMark } from 'app/shared/model//mark.model';
import { IEvaluationAttachment } from 'app/shared/model//evaluation-attachment.model';
import { ITeacher } from 'app/shared/model//teacher.model';
import { ISubject } from 'app/shared/model//subject.model';

export interface IEvaluation {
    id?: number;
    wording?: string;
    comment?: string;
    status?: number;
    date?: Moment;
    marks?: IMark[];
    attachments?: IEvaluationAttachment[];
    teachers?: ITeacher[];
    subjects?: ISubject[];
    teacherLastname?: string;
    teacherId?: number;
    subjectWording?: string;
    subjectId?: number;
}

export class Evaluation implements IEvaluation {
    constructor(
        public id?: number,
        public wording?: string,
        public comment?: string,
        public status?: number,
        public date?: Moment,
        public marks?: IMark[],
        public attachments?: IEvaluationAttachment[],
        public teachers?: ITeacher[],
        public subjects?: ISubject[],
        public teacherLastname?: string,
        public teacherId?: number,
        public subjectWording?: string,
        public subjectId?: number
    ) {}
}
