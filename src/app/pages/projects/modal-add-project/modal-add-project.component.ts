import {AfterViewInit, Component, Inject, forwardRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormAddProjectComponent} from "./form-add-project/form-add-project.component";
import {ProjectsComponent} from "../projects.component";
import {Project} from "../../../models/project/project";
import {ProjectHttpService} from "../../../services/project.http.service";

@Component({
  selector: 'modal-add-project',
  templateUrl: './modal-add-project.component.html',
  styleUrls: ['./modal-add-project.component.scss']
})
export class ModalAddProjectComponent implements AfterViewInit {

  // @ViewChild(FormAddProjectComponent, {static: false})
  // formAddProject: FormAddProjectComponent;
  //
  // @ViewChild(ProjectsComponent, {static: false})
  // projectsComponent: any;

  constructor(
    private projectHttpService: ProjectHttpService,
    @Inject(forwardRef(() => ProjectsComponent)) private _parent:ProjectsComponent
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("After view init MODAL:");
    console.log(this.formAddProject);
    console.log(this._parent);
  }

  // submitCreateProjectForm() {
  //   const self = this;
  //   console.log("Create Form submitted !!!");
  //   console.log(this.formAddProject.project.value);
  //   const project: Project  = new Project(null, this.formAddProject.project.value.title, null);
  //   this.projectHttpService.createProject(project).subscribe(
  //     result => {
  //       console.log(result);
  //       self._parent.dataSource.data.push(new Project(result.id, result.title));
  //       // self._parent.dataSource.data = self._parent.dataSource.data;
  //     }
  //   );
  // }


}
