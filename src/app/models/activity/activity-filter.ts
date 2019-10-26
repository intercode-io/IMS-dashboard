// import DateTimeFormat = Intl.DateTimeFormat;

interface ActivityFilterInterface {
  projectIds: number[];
  userId: number;
  dateFrom: Date;
  dateTo: Date;
}

export class ActivityFilter implements ActivityFilterInterface{
  projectIds: number[];
  userId: number;
  dateFrom: Date;
  dateTo: Date;

  constructor(projectIds: number[], userId: number, dateFrom: Date, dateTo: Date) {
    this.projectIds = projectIds;
    this.userId = userId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
