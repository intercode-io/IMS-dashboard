import {AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {DefaultEditor, ViewCell} from "ng2-smart-table";

@Component({
    selector: 'ngx-display-color-render',
    templateUrl: './display-color-render.component.html',
    styleUrls: ['./display-color-render.component.scss']
})
export class DisplayColorRenderComponent implements ViewCell, OnInit {


    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private zone: NgZone, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        console.log('value color:', this.value);
        // if (.hasOwnProperty('currentValue')) {
        if (typeof this.value == 'string' || typeof this.value == 'number') {
            this.renderValue = this.value.toString();
        } else {
            this.renderValue = this.value['currentValue']['hex'];
        }
        setTimeout(() => {
            this.ref.markForCheck();
        });
    }
}
