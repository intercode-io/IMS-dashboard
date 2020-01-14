import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormAddProjectComponent} from "./form-add-project/form-add-project.component";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Project, ProjectInterface} from "../../../models/project";
import {ProjectService} from "../project.service";

@Component({
    selector: 'modal-add-project',
    templateUrl: './modal-add-project.component.html',
    styleUrls: ['./modal-add-project.component.scss'],
    providers: [NgbModal, NgbModalConfig]
})
export class ModalAddProjectComponent implements OnInit {

    projectTitle: string;
    projectColor: string;
    private project: Project = new Project();
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

    ngOnInit() {
    }

    // receiveTitle($event) {
    //     this.project.title = $event;
    // }
    //
    // receiveColor($event) {
    //     this.project.color=$event;
    // }

    receiveProject($event) {
        console.log("EVENT PR", $event);
        switch ($event[0]) {
            case 'title': {
                this.project.title = $event[1];
                break;
            }
            case 'color': {
                this.project.color=$event[1];
                break;
            }
        }
    }

    submitCreateProjectForm() {
        console.log(this.project);
        this.projectHttpService.createProject(this.project).subscribe(
            result => {
                let project = new Project(result.id, result.title, result.color);
                this.newProject.emit(project);
                this.closeModal(project);
            }
        );
    }

    open() {
        this.dialogRef = this.modalService.open(this.modalAddProject);
    }

    closeModal(data = null) {
        this.dialogRef.close(data);
    }
}
