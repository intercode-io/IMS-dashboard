import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NbDateService} from "@nebular/theme";
import {ActivityService} from "../../../services/activity.service";
import {ActivityDateRangeFilter} from "../../../models/activity-date-range-filter";
import {Subscription} from "rxjs";
import {ProjectService} from "../../../services/project.service";

@Component({
    selector: 'modal-activities-filter',
    templateUrl: './modal-activities-filter.component.html',
    styleUrls: ['./modal-activities-filter.component.scss']
})
export class ModalActivitiesFilterComponent implements OnInit {
    private sub: Subscription = new Subscription();

    projectList = [];
    selectedItems = [];
    dropdownList = [];

    constructor(
        private activityService: ActivityService,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        const projectListNextObs = this.projectService.getUserProjects()
            .subscribe(projects => {
                this.projectService.announceProjectList(projects);
            });

        const projectListObs = this.projectService.project$
            .subscribe(p => {
                this.projectList = Object.assign([], p);
            });

        this.sub.add(projectListNextObs);
        this.sub.add(projectListObs);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onEventStartEndRange($event) {
        if ($event.start != null && $event.end != null) {
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
        classes:"myclass custom-class"
    };

    onItemSelect(item:any){
        let arr=[];
        this.selectedItems.forEach(i => {
            arr[arr.length] = i.id;
        });
        this.activityService.announceProjectIdsFilter(arr);
    }

    OnItemDeSelect(item:any){
        let arr=[];
        this.selectedItems.forEach(i => {
            arr[arr.length] = i.id;
        });
        this.activityService.announceProjectIdsFilter(arr);
    }

    onSelectAll(items: any){
        let arr=[];
        this.selectedItems.forEach(i => {
            arr[arr.length] = i.id;
        });
        this.activityService.announceProjectIdsFilter(arr);
    }

    onDeSelectAll(items: any){
        let arr=[];
        this.selectedItems.forEach(i => {
            arr[arr.length] = i.id;
        });
        this.activityService.announceProjectIdsFilter(arr);
    }
}
