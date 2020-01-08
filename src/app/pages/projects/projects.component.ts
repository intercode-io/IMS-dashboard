import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalAddProjectComponent} from "./modal-add-project/modal-add-project.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Project, ProjectInterface} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {AuthService} from "../../services/auth.service";
import {LocalDataSource} from "ng2-smart-table";
import {MembersChipsComponent} from "./members-chips/members-chips.component";
import {ColorRenderComponent} from "./color-render/color-render.component";
import {ColorEditorRenderComponent} from "./color-editor-render/color-editor-render.component";
import {MembersChipsEditRenderComponent} from "./members-chips-edit-render/members-chips-edit-render.component";

@Component({
    selector: 'ngx-app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
    public dataSource: LocalDataSource = new LocalDataSource();
    private getProjectsObs: any;
    private nextProjectsObs: any;

    @ViewChild(ModalAddProjectComponent, {static: false})
    private modalAddProject: ModalAddProjectComponent;

    constructor(
        private projectService: ProjectService,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.getProjectsObs = this.projectService.getProjectList()
            .subscribe(projects => {
                this.projectService.announceProjectData(projects);
            });

        this.nextProjectsObs = this.projectService.project$
            .subscribe(projects => {
                if (projects) {
                    this.dataSource = new LocalDataSource(projects);
                }
            });
    }


    open() {
        this.modalAddProject.open();
        this.modalAddProject.dialogRef.result.then(result => {
            if (result) {
                this.snackBar.open(`Project "${result.title}" created.`, '', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            }
        })
    }

    public addNewProject(project: ProjectInterface) {
        this.dataSource.add(project).then(r => r);
    }


    settings = {
        actions: {
            edit: true,
            delete: true,
            add: true,
            position: 'right',
        },

        pager: {
            display: true,
        },

        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave:true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            title: {
                title: 'Title',
                type: 'string',
            },
            members: {
                title: 'Members',
                type: 'custom',
                renderComponent: MembersChipsComponent,

                editor: {
                  type: 'custom',
                    component: MembersChipsEditRenderComponent,
                },
            },
            color:  {
                title: 'Color',
                type: 'custom',
                renderComponent: ColorRenderComponent,

                editor: {
                    type: 'custom',
                    component: ColorEditorRenderComponent,
                },
            },
        },
    };

    onEditConfirm(event): void {
        console.log("EDIT: ", event);
        if (window.confirm('Are you sure you want to save?')) {
            const project = new Project(event.data.id, event.newData.title, event.newData.color.value);
            this.projectService.updateProject(project)
                .subscribe(r => {
                    if (r) {
                        event.confirm.resolve(event.newData);
                        this.snackBar.open(`Project with id"${event.data.id}" was successfully updated.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                    else {
                        event.resolve(event.Data);
                        this.snackBar.open(`Project with id"${event.data.id}" was not updated.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                });
        } else {
            event.confirm.reject();
        }
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

// the function below is created for ngx + button
    onCreateConfirm(event) {
        if (window.confirm('Are you sure you want to create a new project?')) {
            const data = event.newData;
            const project = new Project(null, data.title, data.color['currentValue']['hex']);
            this.projectService.createProject(project)
                .subscribe(r => {
                    if (r) {
                        event.confirm.resolve(event.newData);
                        this.snackBar.open(`Project "${event.data.title}" was successfully created.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    } else {
                        event.resolve(event.Data);
                        this.snackBar.open(`ERROR! Project "${event.data.title}" was not created.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                });
        } else {
            event.confirm.reject();
        }
    }
}
