import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
    selector: 'form-add-project',
    templateUrl: './form-add-project.component.html',
    styleUrls: ['./form-add-project.component.scss']
})
export class FormAddProjectComponent implements OnInit {
    createProjectForm: FormGroup;

    @Output() projectEvent = new EventEmitter<string[]>();

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createProjectForm = this.formBuilder.group({
            title: ['Project title'],
            color: ['color']
        })
    }

    public setColor(color: string) {
        this.createProjectForm.value['color'] = color;
        this.projectEvent.emit(['color', color])
    }

    setTitle() {
        this.projectEvent.emit(['title', this.createProjectForm.value.title]);
    }


}
