import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-add-project',
  templateUrl: './form-add-project.component.html',
  styleUrls: ['./form-add-project.component.scss']
})
export class FormAddProjectComponent implements AfterViewInit {

  public project = new FormGroup({
    title: new FormControl(''),
  });
  //
  // @ViewChild("createProjectForm", {read: ElementRef, static: false})
  // createProjectFormElement: ElementRef;

  constructor() {
    console.log("===================================");
    console.log("===================================");
    console.log("===================================");
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("AVI Form add Project: createProjectForm: ");
    // console.log(this.createProjectFormElement)
  }
}
