import { User } from './user';

export class Project {
    id: Number;
    title: string;
    color: string;
    members: User[];

    public constructor(id=null, title=null, color=null, members: User[]=null) {
        this.id = id;
        this.title = title;
        this.color = color;
        this.members = members;
    }
}
