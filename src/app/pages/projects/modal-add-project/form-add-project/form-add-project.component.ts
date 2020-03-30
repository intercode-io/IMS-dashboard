import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Project } from "../../../../models/project";
import { ProjectService } from "../../../../services/project.service";
import { User } from "../../../../models/user";
import { Subscription, Observable } from "rxjs";
import { UserService } from "../../../../services/user.service";
import { map } from 'rxjs/operators';

@Component({
    selector: "form-add-project",
    templateUrl: "./form-add-project.component.html",
    styleUrls: ["./form-add-project.component.scss"]
})
export class FormAddProjectComponent implements OnInit {
    @Input() editData: any
    projectForm: FormGroup;

    protected users: User[] = [];
    protected filteredUsers: User[] = [];
    protected selectedMembers: User[] = [];

    private sub: Subscription = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private userService: UserService,
    ) {}

    ngOnInit() {
        this.createProjectForm();
        this.addSubscriptions();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    submitProjectForm() {
        if (this.projectForm.valid) {
            let projectData: Project = this.projectForm.value as Project;
            projectData.members = this.selectedMembers;

            if (this.editData) {
                projectData.id = this.editData.id;

                this.projectService.updateProject(projectData).subscribe(updatedProject => {
                    this.projectService.announceNewProject(updatedProject);
                });
            }
            else {
                this.projectService.createProject(projectData).subscribe(newProject => {
                    this.projectService.announceNewProject(newProject);
                });
            }
        }
        else {
            this.projectForm.markAllAsTouched();
        }
    }

    protected displayInputWith() {
        return "";
    }

    protected addMember({ option: { value } }) {
        this.selectedMembers.push(value);
        this.users.splice(this.users.indexOf(value), 1);
    }

    protected removeMember(member) {
        this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1);
        this.users.push(member);
    }

    private createProjectForm(): void {
        this.projectForm = this.formBuilder.group({
            title: ["", [Validators.required]],
            color: [""],
            members: [[]],
        });

        this.projectForm.controls.members.valueChanges.subscribe(
            filterValue => {
                if (typeof filterValue === "string") {
                    filterValue = filterValue.toLowerCase();

                    this.filteredUsers = this.users.filter(user =>
                        user.firstName.toLowerCase().includes(filterValue)
                    );
                }
            }
        );

        if (this.editData) {
            this.patchValues();
        }
    }

    private patchValues(): void {
        this.projectForm.patchValue({
            title: this.editData.title,
        });

        this.selectedMembers = this.editData.members;
    }

    private addSubscriptions(): void{
        const getUsersSub = this.userService.getAllUsers()
            .pipe(
                map(users => {
                    if (this.editData) {
                        users = users.filter(user => !this.editData.members.some(member => user.id === member.id))
                    }

                    return users
                })
            )
            .subscribe(users => {
                this.users = users;
                this.filteredUsers = users;
            })

        this.sub.add(getUsersSub);
    }
}
