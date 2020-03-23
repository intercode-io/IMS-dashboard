import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddProjectComponent } from "./modal-add-project/modal-add-project.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { LocalDataSource } from "ng2-smart-table";
import { MembersChipsComponent } from "./members-chips/members-chips.component";
import { ColorRenderComponent } from "./color-render/color-render.component";
import { ColorEditorRenderComponent } from "./color-editor-render/color-editor-render.component";
import { ConfigurationConstants } from '../../constants/configuration-constants';

@Component({
    selector: 'ngx-app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
    public dataSource: LocalDataSource = new LocalDataSource();

    private sub: Subscription = new Subscription();

    @ViewChild(ModalAddProjectComponent, { static: false })
    private modalAddProject: ModalAddProjectComponent;

    constructor(
        private projectService: ProjectService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.addSubscriptions();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    addSubscriptions() {
        const getProjectsObsSub = this.projectService.getProjectUserRoleList()
            .subscribe(projectUserRoles => {
                const projects = projectUserRoles.map(pur => pur.project);

                this.projectService.announceProjectList(projects);
            });

        const nextProjectsObsSub = this.projectService.project$
            .subscribe(projects => {
                if (projects) {
                    this.dataSource = new LocalDataSource(projects);
                }
            });

        const newProjectSub = this.projectService.newProject$.subscribe(project => {
            this.dataSource.append(project);
        })

        this.sub.add(getProjectsObsSub);
        this.sub.add(nextProjectsObsSub);
        this.sub.add(newProjectSub);
    }

    open() {
        this.modalAddProject.open();
        this.modalAddProject.dialogRef.result.then(result => {
            if (result) {
                this.snackBar.open(`Project "${result.title}" created.`, '', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
            }
        })
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
            confirmSave: true,
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

            },
            color: {
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
        if (event.data !== event.newData && window.confirm('Are you sure you want to save?')) {
            const project = new Project(event.data.id, event.newData.title, event.newData.color.value)

            this.projectService.updateProject(project)
                .subscribe(res => {
                    if (res) {
                        event.confirm.resolve(event.newData);
                        this.snackBar.open(`Project with id"${event.data.id}" was successfully updated.`,
                            'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    }
                    else {
                        event.resolve(event.Data);
                        this.snackBar.open(`Project with id"${event.data.id}" was not updated.`,
                            'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    }
                });
        }
        else {
            event.confirm.reject();
        }
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this.projectService.deleteProject(event.data.id).subscribe(res => {
                if (res) {
                    this.snackBar.open(`Project with id"${event.data.id}" was successfully removed.`,
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);

                    this.dataSource.remove(event.data);
                }
                else {
                    this.snackBar.open(`Project with id"${event.data.id}" was not removed.`,
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                }
            });

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
                            'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    } else {
                        event.resolve(event.Data);
                        this.snackBar.open(`ERROR! Project "${event.data.title}" was not created.`,
                            'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    }
                });
        } else {
            event.confirm.reject();
        }
    }
}
