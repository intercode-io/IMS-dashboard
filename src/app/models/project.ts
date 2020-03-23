export class Project {
    id: Number;
    title: string;
    color: string;

    public constructor(id=null, title=null, color=null) {
        this.id = id;
        this.title = title;
        this.color = color;
    }
}
