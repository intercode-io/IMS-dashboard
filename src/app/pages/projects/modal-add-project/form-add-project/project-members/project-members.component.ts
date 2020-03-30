import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from '../../../../../models/user';

@Component({
    selector: "project-members",
    templateUrl: "./project-members.component.html",
    styleUrls: ["./project-members.component.scss"]
})
export class ProjectMembersComponent implements OnInit {
    @Input() selectedMembers: User[];
    @Input() viewMode: boolean = false;

    @Output() removeMemberEvent: EventEmitter<User> = new EventEmitter<User>();

    constructor() {}

    ngOnInit() {}

    removeMember(member) {
        this.removeMemberEvent.emit(member);
    }
}
