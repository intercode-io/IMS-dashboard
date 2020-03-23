export class ActivityDateRangeFilter {
  dateFrom: Date;
  dateTo: Date;

  constructor(dateFrom: Date, dateTo: Date) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
