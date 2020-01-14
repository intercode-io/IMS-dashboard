import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivityService} from "../activity.service";
import {ProjectService} from "../../projects/project.service";
import {AuthService} from "../../../services/auth.service";
import {Project} from "../../../models/project";
// import {Time} from "../../../models/Time";
import {Activity, ActivityInterface} from "../../../models/activity";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {start} from "repl";
import {Time} from "@angular/common";
import {validateEndTime, validateStartTime} from "../validators/time.validators";
import {NgbTime} from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";
import {logger} from "codelyzer/util/logger";
import {DomEvent} from "leaflet";
import off = DomEvent.off;
import {Subscription} from "rxjs";
// import * as moment from 'moment';
// import {Input, DoCheck, KeyValueDiffers} from '@angular/core';
// import {control} from "leaflet";
// import { PermitCard } from '../permit-card';
const moment = require('../../../../../node_modules/moment/moment.js');

@Component({
    selector: 'modal-add-activity',
    templateUrl: './modal-add-activity.component.html',
    styleUrls: ['./modal-add-activity.component.scss'],
    providers: [NgbModal, NgbModalConfig],
})

export class ModalAddActivityComponent implements OnInit {
    protected projectList = [];
    protected userId: number;
    protected date: MatDatepickerInputEvent<Date>;
    protected activityForm: FormGroup;
    private sub: Subscription = new Subscription();
    qtyOfHours: any;
    err: boolean;
    activityId: number;

    dialogRef: NgbModalRef;

    @ViewChild("modalAddActivity", {static: false})
    modalAddActivity: ElementRef;


    @Output() public newActivity: EventEmitter<ActivityInterface> = new EventEmitter<ActivityInterface>();


    constructor(
        protected  activityService: ActivityService,
        protected  projectService: ProjectService,
        protected authService: AuthService,
        private modalService: NgbModal,
        private config: NgbModalConfig,
        private fb: FormBuilder,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    open(data = null) {
        this.dialogRef = this.modalService.open(this.modalAddActivity);
        if (data) {
            this.activityId = data.id;
            const projectName = data.projectId.toString().concat(',', data.projectTitle);
            this.activityForm.patchValue({
                projectName: [projectName],
                description: data.description,
                date: new Date(data.date),
                hours: data.hours
            });

            const logs = JSON.parse(data.logs);
            let id  = 0;
            for (let log of logs) {
                (<FormArray>this.activityForm.get('time')).at(id).patchValue(log);
                // let time = this.activityForm.get('time').value[this.activityForm.get('time').value.length-1];
                // time = log.startTime;
                // time.endTime = log.endTime;
                if (log != logs[logs.length-1]){
                    this.addTimeGroupClick();
                    ++id;
                }
            }
        }
    }

    closeModal(data = null) {
        while((<FormArray>this.activityForm.get('time')).length > 1) {
            (<FormArray>this.activityForm.get('time')).removeAt(1);
        }
        this.activityForm.reset();
        this.activityId = null;
        this.dialogRef.close(data);
    }

    ngOnInit() {
        const userSub = this.authService.user$.subscribe(r => {
            this.userId = r.id;
        });
        this.getProjects();
        this.activityForm = this.fb.group({
            projectName: [''],
            date: [new Date()],
            description: [''],
            time: this.fb.array([
                this.addTimeFormGroup()
            ])
        });

        const formSub = this.activityForm.valueChanges.subscribe((data) => {
            let difference = 0;
            for (let time of (<FormArray>this.activityForm.get('time')).value) {
                try {
                    if (time.endTime.hour > time.startTime.hour) {
                        difference += (time.endTime.hour - time.startTime.hour) * 60;
                        const minutes = time.endTime.minute - time.startTime.minute;
                        difference += minutes;
                    } else if (time.endTime.hour == time.startTime.hour) {
                        difference += time.endTime.minute - time.startTime.minute;
                    } else {
                        difference += time.endTime.minute - time.startTime.minute;
                    }
                } catch (e) {
                    console.error("Not all parameters have been initialized yet: ", e);
                }
            }
            this.qtyOfHours = difference;
        })
        this.sub.add(userSub);
        this.sub.add(formSub);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    addTimeGroupClick() {
        (<FormArray>this.activityForm.get('time')).push(this.addTimeFormGroup());
    }


    addTimeFormGroup(): FormGroup {
        return this.fb.group({
            startTime: [null, [(c) => validateStartTime(c, this.activityForm)]],
            endTime: [null, [(c) => validateEndTime(c, this.activityForm)]]
        });
    }

    deleteTimeButtonClick(timeGroupIndex: number) {
        (<FormArray>this.activityForm.get('time')).removeAt(timeGroupIndex);
    }

    events: string[] = [];

    //TODO change data access
    submitCreateActivityForm(): void {
        const val = this.activityForm.value;
        //.setHours(0,0,0,0).toISOString();
        const projectData = val.projectName[0].split(',', 2);
        let date2 = new Date((new Date(val.date)).setHours(0,0,0,0));
        date2.toUTCString();
        let offset = (new Date).getTimezoneOffset()/60;
        if (offset < 0)
            offset=-offset;
        let date = new Date(val.date.setUTCHours(offset,0,0,0));
        date.toISOString();
        for (let i = 0; i < val.time.length; ++i) {
            delete val.time[i].startTime.second;
            delete val.time[i].endTime.second;
        }

        const timeLogs = JSON.stringify(val.time);

        if (!this.activityId) {
            const activity: Activity = new Activity(0, projectData[0],
                this.userId, val.description, date, timeLogs);

            this.activityService.createActivity(activity).subscribe(
                result => {
                    const activity = new Activity(0, result.projectId, result.userId,
                        result.description, result.date, result.timeLogs, this.qtyOfHours);

                    this.newActivity.emit(activity);
                }
            );
        } else {
            const activity: Activity = new Activity(this.activityId, parseInt(projectData[0]),
                this.userId, val.description, date, timeLogs, this.qtyOfHours);

            this.activityService.updateActivity(activity).subscribe(
                result => {
                    const activity = new Activity(result.id, result.projectId, result.userId,
                        result.description, result.date, result.timeLogs, result.duration);

                    this.newActivity.emit(activity);
                }
            );
        }
        this.closeModal(val.projectName);
    }

    getProjects() {
        this.projectService.getProjectList()
            .subscribe(
                result => {
                    this.projectList = result.map(
                        item => new Project(item.id, item.title)
                    );
                    this.activityForm.controls.projectName.patchValue(this.projectList[0].id);
                }
            );
    }


    startTimeUpdate($event, id) {
        if ($event)
            (<FormArray>this.activityForm.get('time')).at(id).patchValue($event);
    }

    endTimeUpdate($event, id) {
        if ($event)
            (<FormArray>this.activityForm.get('time')).at(id).patchValue($event);
    }
}
