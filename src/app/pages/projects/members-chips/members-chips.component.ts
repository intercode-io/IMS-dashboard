import { Input, Component, NgZone, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'projects-members-chips',
  templateUrl: './members-chips.component.html',
  styleUrls: ['./members-chips.component.scss']
})
export class MembersChipsComponent implements ViewCell, OnInit {

    renderValue: string;
    form: FormGroup;
    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private zone:NgZone, private ref: ChangeDetectorRef) {
    }

    autocompleteItemsAsObjects = [
        {value: 'Item1', id: 0, extra: 0},
        {value: 'item2', id: 1, extra: 1},
        'item3'
    ];

    ngOnInit() {

        console.log('value:', this.value);
        this.renderValue = this.value.toString().toUpperCase();

        // creating form
        this.form = new FormGroup({
            tags: new FormControl('', []) // add validators here
        });

        setTimeout(() => {
            this.ref.markForCheck();
        });
    }

}
