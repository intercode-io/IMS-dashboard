import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ViewCell} from "ng2-smart-table";
import {type} from "os";

@Component({
    selector: 'ngx-color-render',
    templateUrl: './color-render.component.html',
    styleUrls: ['./color-render.component.scss']
})
export class ColorRenderComponent implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private zone:NgZone, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        if (typeof this.value == 'string' || typeof this.value == 'number') {
            this.renderValue = this.value.toString();
        }
        else {
            this.renderValue = this.value['currentValue']['hex'];
        }
        setTimeout(() => {
            this.ref.markForCheck();
        });
    }
}
