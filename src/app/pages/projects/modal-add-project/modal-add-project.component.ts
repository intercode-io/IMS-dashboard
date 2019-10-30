import {
  AfterViewInit,
  Component,
  Inject,
  forwardRef,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren, QueryList
} from '@angular/core';
import {FormAddProjectComponent} from "./form-add-project/form-add-project.component";
import {Project, ProjectInterface} from "../../../models/project/project";
import {ProjectHttpService} from "../../../services/project.http.service";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'modal-add-project',
  templateUrl: './modal-add-project.component.html',
  styleUrls: ['./modal-add-project.component.scss'],
  providers: [NgbModal, NgbModalConfig]
})
export class ModalAddProjectComponent implements OnInit {
  // public addProjectForm: FormGroup;

  // public projectForm = new FormGroup({
  //   title: new FormControl('1233'),
  // });
  projectTitle : string;
  public dialogRef: NgbModalRef;
  receiveTitle($event) {
    this.projectTitle = $event;
    console.log("Title caught in parent: ", $event);
  }

  // @ViewChildren(FormAddProjec    tComponent) child : QueryList<FormAddProjectComponent>;
  @ViewChild(FormAddProjectComponent, {static: true}) child;


  @ViewChild("modalAddProject", {static: false})
  modalAddProject: ElementRef;x

  @Output() public newProject: EventEmitter<ProjectInterface> = new EventEmitter<ProjectInterface>();

  constructor(
    private projectHttpService: ProjectHttpService,
    private config: NgbModalConfig,
    public modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    console.log("On view init MODAL:");
    // console.log(this.formAddProject);
    // this.addProjectForm = this.formBuilder.group({
    //   title: ['Project Title'],
    // })
  }


  // ngAfterViewInit() {
  //   // this.title = this.child.title;
  //   // console.log(this.formAddProject);
  //   console.log("After view init MODAL:");
  //   // const self = this;
  //   // this.child.changes.subscribe(() => {
  //   //   self.title = this.child.toArray().length;
  //   // });
  // }

  // receiveTitle ($event) {
  //   // this.title = this.child.title;
  // }

  submitCreateProjectForm() {
    const self = this;
    console.log("Create Form submitted !!!");

    // console.log(this.formAddProject);
    const project: Project  = new Project(null, this.projectTitle, null);
    this.projectHttpService.createProject(project).subscribe(
      result => {
        console.log(result);
        let project = new Project(result.id, result.title);
        this.newProject.emit(project);
        this.closeModal(project);
      }
    );
  }

  open() {
   this.dialogRef = this.modalService.open(this.modalAddProject);
  }

  closeModal(data = {}) {
     this.dialogRef.close(data)
  }
}
