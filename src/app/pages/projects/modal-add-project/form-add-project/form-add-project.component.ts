import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-add-project',
  templateUrl: './form-add-project.component.html',
  styleUrls: ['./form-add-project.component.scss']
})
export class FormAddProjectComponent implements OnInit {
  title : string = "hello";
  // public addProjectForm: FormGroup;

  //createProjectForm : FormGroup;
  // createProjectForm = new FormGroup({
  //     title: new FormControl('notNull'),
  //   },
  //   { updateOn: "change" });


  createProjectForm : FormGroup;

  @Output() titleEvent  = new EventEmitter<string>();

  SendTitle() {
    this.titleEvent.emit(this.createProjectForm.value.title);
    this.title = this.createProjectForm.value.title;
    console.log(this.title);
    console.log(this.createProjectForm.value.title);
    console.log("Title sent from child");
  }
  // @ViewChild("createProjectForm", {read: ElementRef, static: false})
  // createProjectFormElement: ElementRef;

  constructor(private formBuilder: FormBuilder) {


    console.log("===================================");
    console.log("===================================");
    console.log("===================================");
  }

  // formControlValueChanged() {
  //   this.createProjectForm.get('title').valueChanges.subscribe(
  //     (title: string) => {
  //       debugger
  //       console.log(title);
  //       console.log("HHHiuohsadiuofhuiahfauihfagiuhgfdad");
  //     });
  // }

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      title: ['Project title'],
    })
    // this.formControlValueChanged();
  }

  get projectTitle() {
    return this.createProjectForm;
  }
}

