import { ConfigurationConstants } from './../../constants/configuration-constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from "../../services/activity.service";
import { LocalDataSource } from "ng2-smart-table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalAddActivityComponent } from "./modal-add-activity/modal-add-activity.component";
import { Subscription } from "rxjs";
import { FormatHelper } from '../../helpers/format-helper';

@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss']
})


export class ActivitiesComponent implements OnInit {
    private sub: Subscription = new Subscription();
    public dataSource: LocalDataSource = new LocalDataSource();

    @ViewChild(ModalAddActivityComponent, { static: false })
    private modalAddActivity: ModalAddActivityComponent;

    constructor(
        private activityService: ActivityService,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit() {
        const nextActivitiesSub = this.activityService.filteredList$
            .subscribe(activities => {
                this.dataSource = new LocalDataSource(activities);
            });

        const newActivitySub = this.activityService.newActivity$
            .subscribe(activity => {
                if (this.modalAddActivity) {
                    if (this.modalAddActivity.activityToUpdate) {
                        this.updateActivity(activity)       //TODO: Temporary solution. Needs to be updated later.
                    }
                    else {
                        this.addActivity(activity)
                    }
                }
            })

        this.sub.add(nextActivitiesSub);
        this.sub.add(newActivitySub);
    }

    addActivity(activity) {
        this.dataSource.append(activity);
        this.snackBar.open(`Activity for project "${activity.projectId}" was created.`, 'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
    }

    updateActivity(activity) {
        this.dataSource.update(this.modalAddActivity.activityToUpdate, activity)
        this.snackBar.open(`Activity for project "${activity.projectId}" was updated.`, 'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    open() {
        this.modalAddActivity.activityId = null;

        this.modalAddActivity.open();
        this.modalAddActivity.dialogRef.result.then(result => {
            if (result) {
                this.snackBar.open(
                    `Activity for project "${result.split(",")[1]}" created.`,
                    "OK",
                    ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION
                );
            }
        })
    }


    settings = {
        mode: 'external',
        actions: {
            add: false,
            edit: true,
            delete: true,
            position: 'right',
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            confirmSave: true,
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            userName: {
                title: 'User Name',
                filter: false,
            },
            projectTitle: {
                title: 'Project Title',
                filter: false,
            },
            description: {
                title: 'Description',
                filter: false,
            },
            date: {
                title: 'Date',
                filter: false,
                valuePrepareFunction: (value) => {
                    return FormatHelper.toShortDateString(value);
                }
            },
            duration: {
                title: 'Duration',
                filter: false,
            },
            logs: {
                title: 'Logs',
                type: 'html',
                filter: false,
                valuePrepareFunction: (value) => {
                    return FormatHelper.formatLogs(value);
                }
            },
        },
    };

    onDelete(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this.activityService.removeActivity(event.data.id)
                .subscribe(res => {
                    if (res) {
                        this.snackBar.open(`Activity with id"${event.data.id}" was successfully removed.`,
                            'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);

                        this.dataSource.remove(event.data);
                    }
                    else {
                        this.snackBar.open(`Activity with id"${event.data.id}" was not removed.`,
                            'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    }
                });

        } else {
            this.snackBar.open(`Activity with id"${event.data.id}" was not removed.`,
                'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
            event.confirm.reject();
        }
    }

    onEdit($event) {
        this.modalAddActivity.open($event.data);
    }
}
