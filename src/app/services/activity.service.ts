import {Injectable} from '@angular/core';
import {CommonHttpService} from "./common-http.service";
import {Activity} from "../models/activity";
import {ActivityFilter} from "../models/activity-filter";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ActivityService {

    private activitiesSource: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(null);
    public activities$: Observable<Activity[]> = this.activitiesSource.asObservable();


    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
    ) {
    }


    getActivityList(activityFilter: ActivityFilter) {
        return this.commonHttp.post<Activity[]>('/api/timelog/getList/', activityFilter)
            .pipe(
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to load your activities",
                        'OK', {
                            duration: 10000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }

    public announceActivityData(data) {
        this.activitiesSource.next(data);
    }

    createActivity(activity: Activity) {
        return this.commonHttp.post<Activity>('/api/timelog/create/', activity);
    }
}
