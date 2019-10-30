import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from "../../services/authentification/auth.service";
import {ProjectHttpService} from "../../services/project.http.service";
import {Project, ProjectInterface} from "../../models/project/project";
import {ModalAddProjectComponent} from "./modal-add-project/modal-add-project.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ngx-app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements AfterViewInit {

  displayedColumns: string[] = ["id", "title", "edit"];
  public dataSource = new MatTableDataSource<ProjectInterface>([]); // outputs table

  @ViewChild(ModalAddProjectComponent, {static: false})
  private modalAddProject: ModalAddProjectComponent;

  constructor(
    private projectHttpService: ProjectHttpService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  ngAfterViewInit() {}

  getProjects() {
    const self = this;
    this.projectHttpService.getProjectList(this.authService.getUserId())
      .subscribe(
        result => {
          const projects = result.map(
            item => new Project(item.id, item.title),
          );
          self.dataSource = new MatTableDataSource<ProjectInterface>(projects);
        },
      );
  }

  open() {
    this.modalAddProject.open();
    this.modalAddProject.dialogRef.result.then(result => {
      if (result && result!='undefined' && result!={}) {
        this.snackBar.open(`Project "${result.title}" created.`, '', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
      }
    })
  }

  public addNewProject(project: ProjectInterface) {
    this.dataSource.data = [project, ...this.dataSource.data]
  }
}
