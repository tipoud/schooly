import { ISkill } from 'app/shared/model//skill.model';

export interface IArea {
    id?: number;
    number?: number;
    wording?: string;
    active?: boolean;
    skills?: ISkill[];
}

export class Area implements IArea {
    constructor(public id?: number, public number?: number, public wording?: string, public active?: boolean, public skills?: ISkill[]) {
        this.active = this.active || false;
    }
}
