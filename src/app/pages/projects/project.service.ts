import {Injectable} from '@angular/core';
import {Project, ProjectInterface} from "../../models/project";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, first} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonHttpService} from "../../services/common-http.service";

@Injectable()
export class ProjectService {

    private projectSource: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    public project$: Observable<Project[]> = this.projectSource.asObservable();
    public announceProjectList = (list: Project[]) => {
        this.projectSource.next(list);
    };


    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
    ) {
    }

    createProject(project: Project) {
        console.log(project);
        return this.commonHttp.post<ProjectInterface>('project/create', project);
    }

    getProjectList() {
        return this.commonHttp.get<ProjectInterface[]>('project/getList/')
            .pipe(
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to load your projects",
                        'OK', {
                            duration: 10000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }

    public announceProjectData(data) {
        this.projectSource.next(data);
    }

    updateProject(project: Project) {
        return this.commonHttp.post('project/update', project)
            // return this.commonHttp.post('api/timelog/update', activity)
            .pipe(
                first(),
                catchError((err) => {
                    console.log("ERROR in Editing Project:", err);
                    this.snackBar.open("An error occured while trying to update your project",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            );
    }
}

