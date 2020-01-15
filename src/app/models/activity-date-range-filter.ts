interface ActivityDateRangeFilterInterface {
    dateFrom: Date;
    dateTo: Date;
}

export class ActivityDateRangeFilter implements ActivityDateRangeFilterInterface {
    dateFrom: Date;
    dateTo: Date;

    constructor(dateFrom: Date, dateTo: Date) {
        let offset = (new Date).getTimezoneOffset()/60;
        if (offset < 0)
            offset=-offset;
        dateFrom.setHours(offset,0,0,0);
        dateTo.setHours(offset,0,0,0);

        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
