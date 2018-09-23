import { Moment } from 'moment';

export interface IEvaluationAttachment {
    id?: number;
    wording?: string;
    type?: string;
    date?: Moment;
    path?: string;
    evaluationWording?: string;
    evaluationId?: number;
}

export class EvaluationAttachment implements IEvaluationAttachment {
    constructor(
        public id?: number,
        public wording?: string,
        public type?: string,
        public date?: Moment,
        public path?: string,
        public evaluationWording?: string,
        public evaluationId?: number
    ) {}
}
