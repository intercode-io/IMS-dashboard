import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ViewCell} from "ng2-smart-table";

@Component({
  selector: 'ngx-display-colored-cell-render',
  templateUrl: './display-colored-cell-render.component.html',
  styleUrls: ['./display-colored-cell-render.component.scss']
})
export class DisplayColoredCellRenderComponent implements ViewCell, OnInit {

    classToApply = '';
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private zone: NgZone, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        // console.log('value color:', this.value);
        this.classToApply = 'error';

        // if (.hasOwnProperty('currentValue')) {
        if (typeof this.value == 'string' || typeof this.value == 'number') {
            this.renderValue = this.value.toString();
        } else {
            this.renderValue = this.value['currentValue'];
        }
        setTimeout(() => {
            this.ref.markForCheck();
        });
    }
}
