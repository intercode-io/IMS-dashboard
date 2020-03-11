import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Project } from '../../../../models/project';
import { ProjectService } from '../../../../services/project.service';

@Component({
    selector: 'form-add-project',
    templateUrl: './form-add-project.component.html',
    styleUrls: ['./form-add-project.component.scss']
})
export class FormAddProjectComponent implements OnInit {
    createProjectForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.createProjectForm = this.formBuilder.group({
            title: '',
            color: ''
        })
    }

    submitCreateProjectForm() {
        const projectData: Project = this.createProjectForm.value as Project;

        this.projectService.createProject(projectData).subscribe(newProject => {
            this.projectService.announceNewProject(newProject)
        });
    }
}
