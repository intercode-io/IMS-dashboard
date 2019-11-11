import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormAddProjectComponent} from "./form-add-project/form-add-project.component";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Project, ProjectInterface} from "../../../models/project";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'modal-add-project',
  templateUrl: './modal-add-project.component.html',
  styleUrls: ['./modal-add-project.component.scss'],
  providers: [NgbModal, NgbModalConfig]
})
export class ModalAddProjectComponent implements OnInit {

  projectTitle: string;
  public dialogRef: NgbModalRef;

  @ViewChild("modalAddProject", {static: false})
  modalAddProject: ElementRef;

  @ViewChild(FormAddProjectComponent, {static: true}) child;

  @Output() public newProject: EventEmitter<ProjectInterface> = new EventEmitter<ProjectInterface>();

  constructor(
    private projectHttpService: ProjectService,
    private config: NgbModalConfig,
    public modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() { }

  receiveTitle($event) {
    this.projectTitle = $event;
  }

  submitCreateProjectForm() {
    const project: Project = new Project(null, this.projectTitle, null);
    this.projectHttpService.createProject(project).subscribe(
      result => {
        let project = new Project(result.id, result.title);
        this.newProject.emit(project);
        this.closeModal(project);
      }
    );
  }

  open() {
    console.log(12);
    this.dialogRef = this.modalService.open(this.modalAddProject);
    console.log("Success");
  }

  closeModal(data = null) {
    this.dialogRef.close(data);
  }
}
