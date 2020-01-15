import {ActivityDateRangeFilter} from "./activity-date-range-filter";

interface ActivityFilterInterface {
    projectIds: number[];
    // startDate: Date;
    // endDate: Date;
    activityDateRangeFilter: ActivityDateRangeFilter;

}

export class ActivityFilter implements ActivityFilterInterface {
    projectIds: number[];
    // startDate: Date;
    // endDate: Date;
    activityDateRangeFilter: ActivityDateRangeFilter;

    constructor(projectIds: number[], activityDateRangeFilter: ActivityDateRangeFilter) {
        this.projectIds = projectIds;
        // this.startDate = activityDateRangeFilter.dateFrom;
        // this.endDate = activityDateRangeFilter.dateTo;
        this.activityDateRangeFilter = activityDateRangeFilter;
    }
}
