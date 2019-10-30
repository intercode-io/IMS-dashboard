import {AfterViewInit, Component, forwardRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgModule } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Project} from "../../../models/project/project";
import {AuthService} from "../../../services/authentification/auth.service";
import {ActivityHttpService} from "../../../services/activity.http.service";
import {Activity} from "../../../models/activity/activity";
import {ProjectHttpService} from "../../../services/project.http.service";
import {ActivitiesComponent} from "../activities.component";

@Component({
  selector: 'modal-add-activity',
  templateUrl: './modal-add-activity.component.html',
  styleUrls: ['./modal-add-activity.component.scss']
})

export class ModalAddActivityComponent implements AfterViewInit {

  // projects: Observable<Project[]> = new Observable<Project[]>();

  // projectList = new BehaviorSubject<ProjectInterface[]>([]);
  projectList = [];
  date: MatDatepickerInputEvent<Date>;

  minDate = new Date(2000, 4, 12);
  maxDate = new Date(2030, 4, 22);
  startDate = new Date(2019, 10, 9);
  events: string[] = [];

  activityForm = new FormGroup({
    projectName: new FormControl(), // "", [Validators.required]
    date: new FormControl(new Date()),
    hours: new FormControl(),
    description: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl()
  }, { updateOn: 'change' });

  @ViewChild(ActivitiesComponent, {static: false})
  activityComponent: any;

  constructor(
    protected  activityHttpService: ActivityHttpService,
    protected  projectHttpService: ProjectHttpService,
    protected authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(forwardRef(() => ActivitiesComponent)) private _parent: ActivitiesComponent
  ) {
  }

  ngOnInit() {
    // console.log("projects before func: ", this.observableProjectList)
    this.getProjects();
    console.log('projects in modal: ', this.projectList);
  }

  ngAfterViewInit(): void {
    console.log('AVI Form add Activity: addActivity: ');
  }

  submitCreateActivityForm(): void {
    let vals = this.activityForm.value;

    const partsStartTime =  vals.startTime.toString().split(':');
    const partsHours =  vals.hours.toString().split(':');
    const hoursInMinutes = parseInt(partsHours[0], 10) * 60 + parseInt(partsHours[1], 10);

    const startDateTime = vals.date;
    startDateTime.setHours(parseInt(partsStartTime[0], 10), parseInt(partsStartTime[1], 10), 0);
    let endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + parseInt(partsHours[0], 10));
    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(partsHours[1], 10));

    // TODO Change user_id
    // TODO implement description
    const activity: Activity = new Activity(0, vals.projectName,
      this.authService.getUserId(), vals.description, hoursInMinutes, startDateTime, endDateTime);

    const self = this;
    this.activityHttpService.createActivity(activity).subscribe(
      result => {
        // console.log('Activity in subscription: ', activity);
        self._parent.activityDataSource.data.push(new Activity(0, result.projectId, result.userId,
          result.description, result.hours, result.timeStart, result.timeEnd));
        self._parent.activityDataSource.data = self._parent.activityDataSource.data;
      }
    );
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
          self.activityForm.controls.projectName.patchValue(this.projectList[0].id);
          console.log('obs List: ', self.projectList);
        }
      );
  }
}
