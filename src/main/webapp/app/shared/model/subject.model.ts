import { ISkill } from 'app/shared/model//skill.model';
import { ITeacher } from 'app/shared/model//teacher.model';

export interface ISubject {
    id?: number;
    wording?: string;
    abreviation?: string;
    active?: boolean;
    skills?: ISkill[];
    teachers?: ITeacher[];
    evaluationId?: number;
}

export class Subject implements ISubject {
    constructor(
        public id?: number,
        public wording?: string,
        public abreviation?: string,
        public active?: boolean,
        public skills?: ISkill[],
        public teachers?: ITeacher[],
        public evaluationId?: number
    ) {
        this.active = this.active || false;
    }
}
