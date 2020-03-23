import { ActivityDateRangeFilter } from './activity-date-range-filter';

export class ActivityFilter {
    projectIds: number[];
    activityDateRangeFilter: ActivityDateRangeFilter;

    constructor(projectIds: number[], activityDateRangeFilter: ActivityDateRangeFilter) {
        this.projectIds = projectIds;
        this.activityDateRangeFilter = activityDateRangeFilter;
    }
}
