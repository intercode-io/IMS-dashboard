import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NbDateService} from "@nebular/theme";
import {ActivityService} from "../activity.service";
import {ActivityDateRangeFilter} from "../../../models/activity-date-range-filter";
import {combineLatest, Subscription} from "rxjs";
import {ProjectService} from "../../projects/project.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Project} from "../../../models/project";
import {ActivatedRoute} from "@angular/router";
import {filter, map} from "rxjs/operators";

@Component({
    selector: 'modal-activities-filter',
    templateUrl: './modal-activities-filter.component.html',
    styleUrls: ['./modal-activities-filter.component.scss']
})
export class ModalActivitiesFilterComponent implements OnInit {
    private sub: Subscription = new Subscription();

    private dateFormControl: FormControl;
    projectList = [];
    selectedProjects: Project[];
    selectedItems$ = this.activityService.projectIdsFilter$;
    dropdownList = [];
    datarange = {};

    constructor(
        private activityService: ActivityService,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {

        // this.dateFormControl = fb.
        // this.datarange = {
        //     "start": "2020-01-08T22:00:00.000Z",
        //     "end": "2020-01-15T22:00:00.000Z"
        // };
        // this.filterForm = this.fb.group({
        //     projects: [[]]
        //     }
        // );
        this.sub.add(this.listenForQueryParams());
        const projectListNextObs = this.projectService.getProjectList()
            .subscribe(p => {
                this.projectService.announceProjectList(p);
            });

        const projectListObs = this.projectService.project$
            .subscribe(p => {
                // this.projectList = p;
                this.projectList = Object.assign([], p);
            });

        this.sub.add(projectListNextObs);
        this.sub.add(projectListObs);
        this.sub.add(this.listenSelectedDates());
        this.sub.add(this.listenSelectedProjectsIds());
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }


    onEventStartEndRange($event) {
        if ($event.start != null && $event.end != null) {
            let offset = (new Date).getTimezoneOffset()/60;
            if (offset < 0)
                offset=-offset;
            console.log("offset:", offset);
            $event.start.setHours(offset,0,0,0);
            $event.end.setHours(offset,0,0,0);
            const filter = new ActivityDateRangeFilter($event.start, $event.end);
            this.activityService.announceDateRangeFilter(filter);
        }
    }

    //Project ID Filter:
    dropdownSettings = {
        singleSelection: false,
        text:"Select Projects",
        enableCheckAll: true,
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: false,
        classes:"myclass custom-class",
        badgeShowLimit: 1
    };

    onChange(items){
        let res = this.selectedProjects.map(project => <number>project.id );
        this.activityService.announceProjectIdsFilter(res);
    }


    listenForQueryParams(){
        return combineLatest(
            this.projectService.project$,
            this.route.queryParamMap.pipe(
                filter(qp => qp.get('ids') != null),
                map(qp => qp.get('ids').split('-'))
            ),
        )
            .subscribe(([projectList, selectedIds]) => {
                if (projectList) {
                    this.projectList = projectList;
                    this.selectedProjects = [];
                    if(selectedIds) {
                        selectedIds.forEach(n => {
                            const project = this.projectList.find(project => project.id == n);
                            if (project)
                                this.selectedProjects.push(project);
                        });
                    }
                }
            })
    }

    listenSelectedProjectsIds() {
        return this.activityService.projectIdsFilter$.subscribe((ids: number[]) => {
            this.selectedProjects = [];
            if(this.projectList) { // ? projectList is initialised later
                ids.forEach(n => {
                    const project = this.projectList.find(project => project.id == n);
                    if (project)
                        this.selectedProjects.push(project);
                });
            }
        });
    }

    listenSelectedDates() {
        return this.activityService.dateRangeFilter$.subscribe((dates) => {
            if(dates) { // ? projectList is initialised later
                this.dateFormControl = this.fb.control({
                    start: dates.dateFrom,
                    end: dates.dateTo,
                });
            }
        });
    }
}
