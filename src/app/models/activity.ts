export class Activity {
    id: number;
    projectId: number;
    projectTitle: string;
    userId: number;
    userName: string;
    description: string;
    logs: string;
    date: Date;
    duration: number;

    constructor(
        id: number,
        projectId: number,
        projectTitle: string,
        userId: number,
        userName: string,
        description: string = null,
        date = null,
        logs = null,
        duration = null
    ) {
        this.id = id;
        this.projectId = projectId;
        this.projectTitle = projectTitle;
        this.userId = userId;
        this.userName = userName;
        this.description = description;
        this.date = date;
        this.logs = logs;
        this.duration = duration;
    }
}
