interface ActivityDateRangeFilterInterface {
  dateFrom: Date;
  dateTo: Date;
}

export class ActivityDateRangeFilter implements ActivityDateRangeFilterInterface{
  dateFrom: Date;
  dateTo: Date;

  constructor(dateFrom: Date, dateTo: Date) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
