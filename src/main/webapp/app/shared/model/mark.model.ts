export interface IMark {
    id?: number;
    value?: number;
    nth?: number;
    studentLastname?: string;
    studentId?: number;
    skillWording?: string;
    skillId?: number;
    evaluationWording?: string;
    evaluationId?: number;
}

export class Mark implements IMark {
    constructor(
        public id?: number,
        public value?: number,
        public nth?: number,
        public studentLastname?: string,
        public studentId?: number,
        public skillWording?: string,
        public skillId?: number,
        public evaluationWording?: string,
        public evaluationId?: number
    ) {}
}
