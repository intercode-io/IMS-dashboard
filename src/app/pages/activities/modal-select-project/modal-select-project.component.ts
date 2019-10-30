import { Component, OnInit } from '@angular/core';
import {Project} from "../../../models/project/project";
import {AuthService} from "../../../services/authentification/auth.service";
import {ProjectHttpService} from "../../../services/project.http.service";

@Component({
  selector: 'modal-select-project',
  templateUrl: './modal-select-project.component.html',
  styleUrls: ['./modal-select-project.component.scss']
})
export class ModalSelectProjectComponent implements OnInit {

  projectList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownList = [];
  constructor(
    protected  projectHttpService: ProjectHttpService,
    protected authService: AuthService,
  ) {
  }


  ngOnInit() {
    this.getProjects();

    this.dropdownSettings = {
      singleSelection: false,
      text:"Select Projects",
      enableCheckAll: true,
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: false,
      classes:"myclass custom-class"
    };
  }

  getProjects() {
    const self = this;
    this.projectHttpService.getProjectList(this.authService.getUserId())
      .subscribe(
        result => {
          const projects = result.map(
            item => new Project(item.id, item.title)
          );
          self.projectList = projects;
          // self.projectList = new BehaviorSubject<Project[]>(projects);
          // self.projectList.next(projects);
          // console.log("obs List11111: ", self.observableProjectList)
          this.projectList = projects;
          // todo look for how it works:
          //self.activityForm.controls.projectName.patchValue(this.projectList[0].id);
          console.log('obs List: ', self.projectList);
        }
      );
  }

  onItemSelect(item:any){
    console.log(item["itemName"]);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any){
    console.log(items);
  }
  onDeSelectAll(items: any){
    console.log(items);
  }

}
