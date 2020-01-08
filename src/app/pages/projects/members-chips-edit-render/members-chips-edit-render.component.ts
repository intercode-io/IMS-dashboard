import { Component, OnInit } from '@angular/core';

export interface AutoCompleteModel {
    value: any;
    display: string;
}

@Component({
  selector: 'ngx-members-chips-edit-render',
  templateUrl: './members-chips-edit-render.component.html',
  styleUrls: ['./members-chips-edit-render.component.scss']
})
export class MembersChipsEditRenderComponent implements OnInit {

    public items = [
        {display: 'User 1', value: 1},
        {display: 'User 2', value: 2},
        {display: 'User 3', value: 3},
    ];

    constructor() { }

    ngOnInit() {
    }
}
