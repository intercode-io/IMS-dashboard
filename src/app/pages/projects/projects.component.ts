import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from "../../services/authentification/auth.service";
import {ProjectHttpService} from "../../services/project.http.service";
import {Project, ProjectInterface} from "../../models/project/project";

@Component({
  selector: 'ngx-app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements AfterViewInit {

  displayedColumns: string[] = ["id", "title", "edit"];
  public dataSource = new MatTableDataSource<ProjectInterface>([]); // outputs table


  constructor(
    private projectHttpService: ProjectHttpService,
    private authService: AuthService,
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
}
