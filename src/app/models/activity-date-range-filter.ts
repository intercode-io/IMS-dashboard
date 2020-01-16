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
        dateTo.setHours(24 - offset,59,59,0);

        console.log("ACTIVITY FILTER");
        console.log("FROM: ", dateFrom);
        console.log("TO: ", dateTo);

        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
