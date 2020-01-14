import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Activity} from "../../models/activity";
import {ActivityService} from "./activity.service";
import {ActivityFilter} from "../../models/activity-filter";
import {LocalDataSource} from "ng2-smart-table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModalAddActivityComponent} from "./modal-add-activity/modal-add-activity.component";
import {NbDateService} from '@nebular/theme';
import {Subscription} from "rxjs";
import {ActivityDateRangeFilter} from "../../models/activity-date-range-filter";
import {
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
} from "./addons/smart-table-datepicker/smart-table-datepicker.component";
import {DisplayColorRenderComponent} from "./display-color-render/display-color-render.component";
import {DisplayColoredCellRenderComponent} from "./display-colored-cell-render/display-colored-cell-render.component";


@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})



export class ActivitiesComponent implements OnInit {
    private sub: Subscription = new Subscription();
    public dataSource: LocalDataSource = new LocalDataSource();

    @ViewChild(ModalAddActivityComponent, {static: false})
    private modalAddActivity: ModalAddActivityComponent;


    constructor(
        private activityService: ActivityService,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        const nextActivitiesSub = this.activityService.filteredList$
            .subscribe(activities => {
                this.dataSource = new LocalDataSource(activities);
            });
        this.sub.add(nextActivitiesSub);

    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    open() {
        this.modalAddActivity.open();
        this.modalAddActivity.dialogRef.result.then(result => {
            if (result) {
                this.snackBar.open(`Activity for project "${result.projectName}" created.`, '', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
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
        pager: {
            display: true,
        },
        noDataMessage: '',
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
            // id: {
            //     title: 'Activity ID',
            //     type: 'number',
            // },
            color: {
                title: ' ',
                type: 'custom',
                filter: false,
                width: '10px',
                renderComponent: DisplayColorRenderComponent
            },
            userName: {
                title: 'User Name',
                type: 'custom',
                filter: false,
                renderComponent: DisplayColoredCellRenderComponent,
            },
            projectTitle: {
                title: 'Project Title',
                type: 'custom',
                filter: false,
                renderComponent: DisplayColoredCellRenderComponent,
            },
            description: {
                title: 'Description',
                type: 'custom',
                filter: false,
                renderComponent: DisplayColoredCellRenderComponent,
            },
            date: {
                title: 'date',
                type: 'custom',
                filter: false,
                renderComponent: DisplayColoredCellRenderComponent,
            },
            duration: {
                title: 'duration',
                type: 'custom',
                filter: false,
                renderComponent: DisplayColoredCellRenderComponent,
            },
            // logs: {
            //     title: 'Logs',
            //     type: 'custom',
            //     filter: false,
            //     renderComponent: DisplayColoredCellRenderComponent,
                // valuePrepareFunction: (cell, row) => {
                //     // example of value.... value = 1543105073896
                //     // value is timeStamp
                //     console.log("valuePREPARE CELL:", cell);
                //     console.log("valuePREPARE ROW:", row);
                //     return `<div [style.backgroundColor]="row.color">${cell}</div>`;
                //     // return `<!--<div style="background-color:red">${cell}</div>-->`;
                // },
        },
    };

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            const deleted = this.activityService.removeActivity(event.data.id)
                .subscribe(r => {
                    if (r) {
                        event.confirm.resolve();
                        this.snackBar.open(`Activity with id"${event.data.id}" was successfully removed.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    } else {
                        this.snackBar.open(`Activity with id"${event.data.id}" was not removed.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                });

        } else {
            this.snackBar.open(`Activity with id"${event.data.id}" was not removed.`,
                'OK', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            event.confirm.reject();
        }
    }

    onEdit($event) {
        this.modalAddActivity.open($event.data);
        this.modalAddActivity.dialogRef.result.then(result => {
            if (result) {
                this.snackBar.open(`Activity for project "${result}" updated.`, 'OK', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            }
            else {
                this.snackBar.open(`Activity for project "${result.projectName}" was not updated.`, 'OK', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            }
            this.modalAddActivity.dialogRef.close();
        });
        console.log("modal edit $event");
        console.log($event);
    }

    // onEditConfirm(event): void {
    //     if (window.confirm('Are you sure you want to save?')) {
    //         this.activityService.updateActivity(event.newData)
    //             .subscribe(r => {
    //                 if (r) {
    //                     event.confirm.resolve(event.newData);
    //                     this.snackBar.open(`Activity with id"${event.data.id}" was successfully updated.`,
    //                         'OK', {
    //                             duration: 5000,
    //                             horizontalPosition: "center",
    //                             verticalPosition: "top"
    //                         });
    //                 }
    //                 else {
    //                     event.resolve(event.Data);
    //                     this.snackBar.open(`Activity with id"${event.data.id}" was not updated.`,
    //                         'OK', {
    //                             duration: 5000,
    //                             horizontalPosition: "center",
    //                             verticalPosition: "top"
    //                         });
    //                 }
    //             });
    //     } else {
    //         event.confirm.reject();
    //     }
    // }

    // the function below is created for ngx + button
    onCreateConfirm(event): Activity {
        if (window.confirm('Are you sure you want to create a project?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
        return new Activity(event.data.title, null, 2, event.data.description, null, null);
    }
}
