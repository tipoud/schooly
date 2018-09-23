import { ISubject } from 'app/shared/model//subject.model';

export interface ISkill {
    id?: number;
    wording?: string;
    level1?: string;
    level2?: string;
    level3?: string;
    level4?: string;
    active?: boolean;
    areaWording?: string;
    areaId?: number;
    subjects?: ISubject[];
}

export class Skill implements ISkill {
    constructor(
        public id?: number,
        public wording?: string,
        public level1?: string,
        public level2?: string,
        public level3?: string,
        public level4?: string,
        public active?: boolean,
        public areaWording?: string,
        public areaId?: number,
        public subjects?: ISubject[]
    ) {
        this.active = this.active || false;
    }
}
