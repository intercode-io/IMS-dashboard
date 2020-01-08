export interface ActivityInterface {
    id: number;
    projectId: number;
    // projectTitle: string;
    userId: number;
    description: string;
    logs: string;
    date: Date;
    duration: number;
    color: string;
}

export class Activity implements ActivityInterface {
    id: number;
    projectId: number;
    //projectTitle: string;
    userId: number;
    description: string;
    logs: string;
    date: Date;
    duration: number;
    color: string;


    constructor(id: number, projectId: number, userId: number,
                description: string = null, date = null, logs = null,
                duration = null, color = null) {
        this.id = id;
        this.projectId = projectId;
        // this.projectTitle = projectTitle;
        this.userId = userId;
        this.description = description;
        this.date = date;
        this.logs = logs;
        this.duration = duration;
        this.color = color;
    }
}
