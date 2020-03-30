import { Injectable } from '@angular/core';
import { Project } from "../models/project";
import { CommonHttpService } from "./common-http.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, first, filter } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfigurationConstants } from '../constants/configuration-constants';

@Injectable()
export class ProjectService {

    private projectSource: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    public project$: Observable<Project[]> = this.projectSource.asObservable();

    private newProject: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
    public newProject$: Observable<Project> = this.newProject.asObservable().pipe(
        filter(data => data !== null)
    );

    public announceProjectList = (list: Project[]) => {
        this.projectSource.next(list);
    };

    public announceNewProject = (project: Project) => {
        this.newProject.next(project);
    }

    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
    ) {
    }

    getProjects() {
        return this.commonHttp.get<Project[]>('project/getList/')
            .pipe(
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to load your projects",
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);

                    return of(null);
                })
            )
    }

    createProject(project: Project) {
        return this.commonHttp.post<Project>('project/create', project);
    }

    updateProject(project: Project) {
        return this.commonHttp.put('project/update', project)
            .pipe(
                first(),
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to update your project",
                        'OK', ConfigurationConstants.DEFAULT_MATSNACKBACK_CONFIGURATION);
                    return of(null);
                })
            );
    }

    deleteProject(projectId: number) {
        return this.commonHttp.delete('project/remove/' + projectId)
    }
}

