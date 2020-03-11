import { User } from './../../../models/user';
import { ProjectUserRole } from './../../../models/project-user-role';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivityService } from "../../../services/activity.service";
import { ProjectService } from "../../../services/project.service";
import { AuthService } from "../../../services/auth.service";
import { Activity } from "../../../models/activity";
import { NgbModal, NgbModalConfig, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { validateEndTime, validateStartTime } from "../validators/time.validators";

@Component({
    selector: 'modal-add-activity',
    templateUrl: './modal-add-activity.component.html',
    styleUrls: ['./modal-add-activity.component.scss'],
    providers: [NgbModal, NgbModalConfig],
})

export class ModalAddActivityComponent implements OnInit {
    public qtyOfHours: any;
    public err: boolean;
    public activityId: number;

    protected projectUserRoles: ProjectUserRole[];
    protected user: User;
    protected date: MatDatepickerInputEvent<Date>;
    protected activityForm: FormGroup;

    public activityToUpdate: Activity;

    dialogRef: NgbModalRef;

    @ViewChild("modalAddActivity", { static: false })
    modalAddActivity: ElementRef;

    constructor(
        protected activityService: ActivityService,
        protected projectService: ProjectService,
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
        this.activityToUpdate = null;

        if (data) {
            this.activityToUpdate = data as Activity;
            this.activityId = data.id;
            this.activityForm.patchValue({
                projectUserRole: this.projectUserRoles.find(pur => pur.id === data.projectUserRoleId),
                description: data.description,
                date: new Date(data.date),
            });

            const logs = JSON.parse(data.logs);
            let id = 0;
            for (let log of logs) {
                (<FormArray>this.activityForm.get('time')).at(id).patchValue(log);
                if (log != logs[logs.length - 1]) {
                    this.addTimeGroupClick();
                    ++id;
                }
            }
        }
    }

    closeModal(data = null) {
        if (this.dialogRef) {
            this.dialogRef.close(data);
        }
    }

    ngOnInit() {
        const userSub = this.authService.user$.subscribe(res => {
            this.user = res;
        });

        this.getProjectSelectData();
        this.activityForm = this.fb.group({
            projectUserRole: [{}],
            date: [new Date()],
            description: [''],
            time: this.fb.array([
                this.addTimeFormGroup()
            ])
        });

        this.activityForm.valueChanges.subscribe((data) => {
            let difference = 0;
            for (let time of (<FormArray>this.activityForm.get('time')).value) {
                if (time.startTime && time.endTime) {
                    if (time.endTime.hour > time.startTime.hour) {
                        difference += (time.endTime.hour - time.startTime.hour) * 60;
                        const minutes = time.endTime.minute - time.startTime.minute;
                        difference += minutes;
                    } else if (time.endTime.hour == time.startTime.hour) {
                        difference += time.endTime.minute - time.startTime.minute;
                    } else {
                        difference += time.endTime.minute - time.startTime.minute;
                    }
                }
            }
            this.qtyOfHours = difference;
        })
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

        for (let i = 0; i < val.time.length; ++i) {
            delete val.time[i].startTime.second;
            delete val.time[i].endTime.second;
        }

        const timeLogs = JSON.stringify(val.time);

        if (!this.activityId) {
            const activity: Activity = new Activity(0, val.projectUserRole.id, val.projectUserRole.project.id, val.projectUserRole.project.title,
                this.user.userName, val.description, val.date, timeLogs, this.qtyOfHours);

            this.activityService.createActivity(activity).subscribe(
                result => {
                    const activity = result as Activity;

                    this.activityService.announceNewActivity(activity);
                }
            );
        } else {
            const activity: Activity = new Activity(this.activityId, val.projectUserRole.id, val.projectUserRole.project.id, val.projectUserRole.project.title,
                this.user.userName, val.description, val.date, timeLogs, this.qtyOfHours);

            this.activityService.updateActivity(activity).subscribe(
                result => {
                    const activity = result as Activity;

                    this.activityService.announceNewActivity(activity);
                }
            );
        }
        this.closeModal(val.projectName);
    }

    getProjectSelectData() {
        this.projectService.getProjectUserRoleList()
            .subscribe(
                result => {
                    this.projectUserRoles = result;

                    this.activityForm.controls.projectUserRole.patchValue(this.projectUserRoles[0]);
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
