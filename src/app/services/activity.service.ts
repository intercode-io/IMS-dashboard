import {Injectable, Output} from '@angular/core';
import {CommonHttpService} from "./common-http.service";
import {Activity} from "../models/activity";
import {ActivityFilter} from "../models/activity-filter";
import {BehaviorSubject, Observable, of, combineLatest} from "rxjs";
import {catchError, first, switchMap, filter} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityDateRangeFilter} from "../models/activity-date-range-filter";
import { EventEmitter } from 'events';
import { ConfigurationConstants } from '../constants/configuration-constants';

@Injectable()
export class ActivityService {

    private projectIdsFilter: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    private dateRangeFilter: BehaviorSubject<ActivityDateRangeFilter> = new BehaviorSubject<ActivityDateRangeFilter>(
        new ActivityDateRangeFilter(new Date(1900,11,1), new Date(2100, 1,1))
    );
    private newActivity: BehaviorSubject<Activity> = new BehaviorSubject<Activity>(null)

    public projectIdsFilter$: Observable<number[]> = this.projectIdsFilter.asObservable();
    public dateRangeFilter$: Observable<ActivityDateRangeFilter> = this.dateRangeFilter.asObservable();
    public newActivity$: Observable<Activity> = this.newActivity.asObservable().pipe(
        filter(data => data !== null)
    );

    public filteredList$ = combineLatest(
        this.projectIdsFilter$,
        this.dateRangeFilter$,
    ).pipe(
        switchMap(([projectIdsFilter, dateRangeFilter]) => {
            return this.getActivityList(new ActivityFilter(projectIdsFilter, dateRangeFilter))
        })
    );

    public announceDateRangeFilter = (dateRangeFilter: ActivityDateRangeFilter) => {
        this.dateRangeFilter.next(dateRangeFilter);
    };

    public announceProjectIdsFilter = (list: number[]) => {
        this.projectIdsFilter.next(list);
    };

    public announceNewActivity = (activity: Activity) => {
        this.newActivity.next(activity);
    }

    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
    ) { }


    getActivityList(activityFilter: ActivityFilter) {
        return this.commonHttp.post<Activity[]>('timelog/getList/', activityFilter)
            .pipe(
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to load your activities",
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    return of(null);
                })
            )
    }


    createActivity(activity: Activity) {
        return this.commonHttp.post<Activity>('timelog/create/', activity)
            .pipe(
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to create a activity",
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    return of(null);
                })
            )
    }

    removeActivity(activityId: number) {
        return this.commonHttp.delete('timelog/remove/' + activityId)
            .pipe(
                first(),
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to remove your activitiy",
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    return of(null);
                })
            );
    }

    updateActivity(activity) {
        return this.commonHttp.put('timelog/update/', activity)
            .pipe(
                first(),
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to update your activitiy",
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    return of(null);
                })
            );
    }
}
