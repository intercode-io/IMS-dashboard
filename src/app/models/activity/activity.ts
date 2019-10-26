export interface ActivityInterface {
  id: number;
  projectId: number;
  // projectTitle: string;
  userId: number;
  description: string;
  hours: number;
  timeStart: Date;
  timeEnd: Date;
}

export class Activity implements ActivityInterface {
  id: number;
  projectId: number;
  // projectTitle: string;
  userId: number;
  description: string;
  hours: number;
  timeStart: Date;
  timeEnd: Date;

  constructor(id: number, projectId: number, userId: number,
              description: string = null, hours: number,
              startTime: Date, endTime: Date) {
    this.id = id;
    this.projectId = projectId;
    // this.projectTitle = projectTitle;
    this.userId = userId;
    this.description = description;
    this.hours = hours;
    this.timeStart = startTime;
    this.timeEnd = endTime;
  }
}
