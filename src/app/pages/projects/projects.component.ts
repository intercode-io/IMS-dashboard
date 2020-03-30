import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddProjectComponent } from "./modal-add-project/modal-add-project.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { LocalDataSource } from "ng2-smart-table";
import { ConfigurationConstants } from '../../constants/configuration-constants';
import { ProjectMembersViewCell } from './modal-add-project/form-add-project/project-members/project-members-view-cell.component';

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
        private snackBar: MatSnackBar,
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
        const getProjectsObsSub = this.projectService.getProjects()
            .subscribe(projects => {
                this.projectService.announceProjectList(projects);
            });

        const nextProjectsObsSub = this.projectService.project$
            .subscribe(projects => {
                if (projects) {
                    this.dataSource = new LocalDataSource(projects);
                }
            });

        const newProjectSub = this.projectService.newProject$.subscribe(newProject => {
            if (this.modalAddProject) {
                const projectToUpdate = this.modalAddProject.editData;

                if (projectToUpdate) {
                    this.updateProject(projectToUpdate, newProject);
                }
                else {
                    this.addProject(newProject);
                }
            }
        })

        this.sub.add(getProjectsObsSub);
        this.sub.add(nextProjectsObsSub);
        this.sub.add(newProjectSub);
    }

    settings = {
        mode: "external",
        actions: {
            edit: true,
            delete: true,
            add: false,
            position: 'right',
        },

        pager: {
            display: true,
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
                renderComponent: ProjectMembersViewCell
            },
        },
        hideSubHeader: true,
    };

    onAdd(): void {
        this.modalAddProject.open();
    }

    onEdit($event): void {
        this.modalAddProject.open($event.data);
    }

    onDelete(event): void {
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

        }
    }

    private addProject(project: Project): void {
        this.dataSource.append(project);
        this.snackBar.open(`Project "${project.title}" created.`, '', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
    }

    private updateProject(projectToUpdate: Project, project: Project): void {
        this.dataSource.update(projectToUpdate, project);
        this.snackBar.open(`Project with id: ${project.id} updated.`, '', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
    }
}
