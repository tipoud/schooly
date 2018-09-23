import { Moment } from 'moment';

export interface IStudent {
    id?: number;
    lastname?: string;
    firstname?: string;
    email1?: string;
    email2?: string;
    birthdate?: Moment;
    classroomWording?: string;
    classroomId?: number;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public lastname?: string,
        public firstname?: string,
        public email1?: string,
        public email2?: string,
        public birthdate?: Moment,
        public classroomWording?: string,
        public classroomId?: number
    ) {}
}
