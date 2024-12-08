import { User } from "../auth/auth.model";


export class Archive{
    constructor(
        public id: string,
        public name: File,
        public type: string,
        public creation_date: Date,
        public description: string,
        public owner: User,
        public filesNumber: string,
    ){}
    }




