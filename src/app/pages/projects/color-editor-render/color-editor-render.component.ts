import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {ColorPickerComponent} from "@syncfusion/ej2-angular-inputs";

@Component({
    selector: 'ngx-color-editor-render',
    templateUrl: './color-editor-render.component.html',
    styleUrls: ['./color-editor-render.component.scss']
})


export class ColorEditorRenderComponent extends DefaultEditor implements OnInit {

    colorValue: string;

    @ViewChild('colorpicker', {static: false})
    public colorPicker: ColorPickerComponent;

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.cell.newValue !== '') {
            if (typeof this.cell.getValue() == 'string') {
                this.colorValue = this.cell.getValue();
            }
            else if (this.cell.getValue().hasOwnProperty('currentValue')) {
                this.colorValue = this.cell.getValue()['currentValue']['hex'];
            }
            else
                this.colorValue = '#ffffff'
        }
    }

    colorChanged($event) {
        this.cell.newValue = $event;
    }

}
