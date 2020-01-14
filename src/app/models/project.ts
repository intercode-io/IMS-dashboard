export interface ProjectInterface {
    id: Number;
    title: string;
    color: string;
    // invitedMembers: Member[];
    // invitedMembers will be used later
}

export class Project implements ProjectInterface {
    id: Number;
    title: string;
    color: string;

    // invitedMembers: Member[];

    public constructor(id=null, title=null, color=null, invitedMembers=null) {
        this.id = id;
        this.title = title;
        this.color = color;
        // this.invitedMembers = invitedMembers;
    }
}
