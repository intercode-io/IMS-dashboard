export class Activity {
    id: number;
    projectUserRoleId: number;
    projectId: number;
    projectTitle: string;
    userName: string;
    description: string;
    logs: string;
    date: Date;
    duration: number;

    constructor(
        id: number,
        projectUserRoleId: number,
        projectId: number,
        projectTitle: string,
        userName: string,
        description: string = null,
        date = null,
        logs = null,
        duration = null
    ) {
        this.id = id;
        this.projectUserRoleId = projectUserRoleId,
        this.projectId = projectId;
        this.projectTitle = projectTitle;
        this.userName = userName;
        this.description = description;
        this.date = date;
        this.logs = logs;
        this.duration = duration;
    }
}
