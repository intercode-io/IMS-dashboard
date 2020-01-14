import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from "ng2-smart-table";

@Component({
  selector: 'ngx-smart-table-datepicker-render',
  templateUrl: './smart-table-datepicker-render.component.html',
  styleUrls: ['./smart-table-datepicker-render.component.scss']
})
export class SmartTableDatepickerRenderComponent implements ViewCell, OnInit {
    @Input() value: string;
    @Input() rowData: any;

    constructor() { }

    ngOnInit() { }
}
