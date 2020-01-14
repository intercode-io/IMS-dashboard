import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'ngx-my-spinner',
  templateUrl: './my-spinner.component.html',
  styleUrls: ['./my-spinner.component.scss']
})
export class MySpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showSpinner = environment.showSpinner;

}
