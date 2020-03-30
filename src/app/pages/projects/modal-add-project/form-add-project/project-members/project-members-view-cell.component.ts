import { Component} from "@angular/core";
import { ViewCell } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { ProjectMembersComponent } from './project-members.component';
import { User } from '../../../../../models/user';

@Component({
    selector: "project-members-dialog",
    template: `<span (click)="openDialog()">See members...</span>`,
    styles: ['span { cursor: pointer; color: blue; text-decoration: underline; }']
})
export class ProjectMembersViewCell implements ViewCell {
    value: any;
    rowData: any;

    constructor(private membersDialog: MatDialog) { }

    openDialog() {
        const dialogInstance = this.membersDialog.open(ProjectMembersComponent);
        const componentInstance = dialogInstance.componentInstance;

        componentInstance.viewMode = true;
        componentInstance.selectedMembers = this.value as User[];
    }
}
