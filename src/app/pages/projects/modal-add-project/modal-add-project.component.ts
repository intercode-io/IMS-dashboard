import { Subscription } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormAddProjectComponent } from "./form-add-project/form-add-project.component";
import { NgbModal, NgbModalConfig, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Project } from "../../../models/project";
import { ProjectService } from './../../../services/project.service';

@Component({
    selector: 'modal-add-project',
    templateUrl: './modal-add-project.component.html',
    styleUrls: ['./modal-add-project.component.scss'],
    providers: [NgbModal, NgbModalConfig]
})
export class ModalAddProjectComponent {
    private sub: Subscription = new Subscription();

    public dialogRef: NgbModalRef;

    @ViewChild("modalAddProject", { static: false })
    modalAddProject: ElementRef;

    constructor(
        private projectService: ProjectService,
        private config: NgbModalConfig,
        public modalService: NgbModal
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        const newProjectSub = this.projectService.newProject$.subscribe(newProject => {
            this.closeModal(newProject)
        })

        this.sub.add(newProjectSub);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    open() {
        this.dialogRef = this.modalService.open(this.modalAddProject);
    }

    closeModal(data = null) {
        if (this.dialogRef) {
            this.dialogRef.close(data);
        }
    }
}
