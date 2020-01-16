import {Injectable} from '@angular/core';
import {CommonHttpService} from "../../services/common-http.service";
import {Activity} from "../../models/activity";
import {ActivityFilter} from "../../models/activity-filter";
import {BehaviorSubject, Observable, of, combineLatest, merge, Subscription, pipe} from "rxjs";
import {catchError, distinctUntilChanged, filter, first, map, switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityDateRangeFilter} from "../../models/activity-date-range-filter";
import {ActivatedRoute, Router} from "@angular/router";
import {split} from "ts-node/dist";

@Injectable()
export class ActivityService {

    private projectIdsFilter: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public projectIdsFilter$: Observable<number[]> = this.projectIdsFilter.asObservable();
    public announceProjectIdsFilter = (list: number[]) => {
        this.projectIdsFilter.next(list);
    };

    private dateRangeFilter: BehaviorSubject<ActivityDateRangeFilter> = new BehaviorSubject<ActivityDateRangeFilter>(
        new ActivityDateRangeFilter(new Date(1900, 11, 1), new Date(2100, 1, 1))
    );
    public dateRangeFilter$: Observable<ActivityDateRangeFilter> = this.dateRangeFilter.asObservable();
    public announceDateRangeFilter = (dateRangeFilter: ActivityDateRangeFilter) => {
        let offset = (new Date).getTimezoneOffset()/60;
        if (offset < 0)
            offset=-offset;
        let dateStart = new Date(dateRangeFilter.dateFrom.setUTCHours(offset,0,0,0));
        dateStart.toISOString();

        offset = (new Date).getTimezoneOffset()/60;
        if (offset < 0)
            offset=-offset;
        let dateEnd = new Date(dateRangeFilter.dateTo.setUTCHours(offset,0,0,0));
        dateEnd.toISOString();

        this.dateRangeFilter.next(new ActivityDateRangeFilter(dateStart, dateEnd));
    };

    public filteredList$ = combineLatest(
        this.projectIdsFilter$,
        this.dateRangeFilter$
    ).pipe(
        switchMap(([projectIdsFilter, dateRangeFilter]) => {
            return this.getActivityList(new ActivityFilter(projectIdsFilter, dateRangeFilter))
        })
    );

    private sub: Subscription = new Subscription();

    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.sub.add(this.listenForProjectChanges());
        this.sub.add(this.listenForDateChanges());
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private listenForProjectChanges() {
        return merge(
            this.route.queryParamMap.pipe(
                map(qp => {
                    if (qp.get('ids'))
                        return qp.get('ids').split('-');
                    else
                        return ["all"];
                })
            ),
            this.projectIdsFilter$
        ).pipe(
            distinctUntilChanged()
        ).subscribe((ids: any) => { // ? any || number
        // ).subscribe((ids: number[] | string[]) => {
            console.log("ids:", ids);
            if (!this.arraysEquals(this.projectIdsFilter.value, ids)) {
                if (ids[0] == 'all')
                    this.announceProjectIdsFilter([]);
                else
                    this.announceProjectIdsFilter(ids);
            }

            const qpSnapshot = this.route.snapshot.queryParams;
            if (qpSnapshot.ids == undefined) {
                ids = ["all"];  //default projects
                let queryParams = {};

                if (ids.length) {
                    queryParams = {...qpSnapshot, ids: ids.join("-")};
                }
                return this.router.navigate([], {relativeTo: this.route, queryParams});
            }
            else if (!this.arraysEquals(qpSnapshot.ids.split('-'), ids)) {
                let queryParams = {};

                if (ids.length) {
                    queryParams = {...qpSnapshot, ids: ids.join("-")};
                }
                else {
                    queryParams = {...qpSnapshot, ids: "all"};
                }
                return this.router.navigate([], {relativeTo: this.route, queryParams});
            }
        });
    }

    arraysEquals(array1, array2) {
        return array1.length === array2.length && array1.sort().every((value, index) =>     { return value === array2.sort()[index]});
    }


    private listenForDateChanges() {
        return merge(
            this.route.queryParamMap.pipe(
                filter(qp => qp.get('start') != null),
                filter(qp => qp.get('end') != null),
                map(qp => {
                    try {
                        let dateStart = new Date(qp.get('start'));
                        let dateEnd = new Date(qp.get('end'));
                        return new ActivityDateRangeFilter(dateStart, dateEnd);
                    }
                    catch (e) {
                        console.log("ERROR IN FILTER");
                        console.log(e);
                        new ActivityDateRangeFilter(new Date(1900, 11, 11), new Date(2100, 11, 11))
                    }
                })
            ),
            // this.route.queryParamMap.pipe(
            //     filter(qp => qp.get('end') != null),
            //     map(qp => new Date(qp.get('end')))
            // ),
            this.dateRangeFilter$
        ).pipe(
            distinctUntilChanged()
        ).subscribe((dates: ActivityDateRangeFilter) => {
            console.log("DATES: ", dates);
            console.log("  DRF: ", this.dateRangeFilter.value);
            console.log("RESULT =>  ", this.compareActivityDateRange(this.dateRangeFilter.value, dates));
            if (!this.compareActivityDateRange(this.dateRangeFilter.value, dates)) {
                this.announceDateRangeFilter(dates);
            }

            const qpSnapshot = this.route.snapshot.queryParams;

            // if (!this.arraysEquals(qpSnapshot.ids.split('-'), ids)) {
            let queryParams = {};
            const dateFrom = [dates.dateFrom.getMonth(), dates.dateFrom.getDay(), dates.dateFrom.getFullYear()];
            const dateTo = [dates.dateTo.getMonth(), dates.dateTo.getDay(), dates.dateTo.getFullYear()];

            if (dateFrom && dateTo)
                queryParams = {...qpSnapshot, start: dateFrom.join('-'), end: dateTo.join('-')};

            return this.router.navigate([], {relativeTo: this.route, queryParams});
        });
    }

    compareActivityDateRange(filter1: ActivityDateRangeFilter, filter2: ActivityDateRangeFilter) {
        if (filter1 == undefined || filter2 == undefined)
            return false;
        if (+filter1.dateFrom === +filter2.dateFrom &&
            +filter1.dateTo === +filter2.dateTo)
            // if (filter1.dateFrom.getTime() == filter2.dateFrom.getTime() &&
            //     filter1.dateTo.getTime() == filter2.dateTo.getTime())
            return true;
        else
            return false;
    }


    getActivityList(activityFilter: ActivityFilter) {
        return this.commonHttp.post<Activity[]>('timelog/getList/', activityFilter)
            .pipe(
                catchError((err) => {
                    console.log("ERROR in GetActivities List:", err);
                    this.snackBar.open("An error occured while trying to load your activities",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }


    createActivity(activity: Activity) {
        const activity1 = {...activity, ProjectUserRoleId: 7};
        console.log(activity1);
        return this.commonHttp.post<Activity>('timelog/create/', activity1)
            .pipe(
                catchError((err) => {
                    console.log("ERROR in createActivity:", err);
                    this.snackBar.open("An error occured while trying to create a activity",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }

    removeActivity(activityId: number) {
        return this.commonHttp.get('/timelog/remove/' + activityId)
            .pipe(
                first(),
                catchError((err) => {
                    console.log("ERROR in Remove TimeLog:", err);
                    this.snackBar.open("An error occured while trying to remove your activitiy",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            );
    }

    updateActivity(activity) {
        return this.commonHttp.post('timelog/update/', activity)
            // return this.commonHttp.post('api/timelog/update', activity)
            .pipe(
                first(),
                catchError((err) => {
                    console.log("ERROR in Remove TimeLog:", err);
                    this.snackBar.open("An error occured while trying to update your activitiy",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            );
    }
}
