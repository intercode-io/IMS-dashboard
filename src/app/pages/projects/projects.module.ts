import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerModule} from "@syncfusion/ej2-angular-inputs";
import {ColorRenderComponent} from "./color-render/color-render.component";
import {ColorEditorRenderComponent} from "./color-editor-render/color-editor-render.component";
import {ColorPickerComponent} from "./color-picker/color-picker.component";
import {ProjectService} from "../../services/project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSmartModalService} from "ngx-smart-modal";
import {NgbModal, NgbModalConfig, NgbTabsetModule, NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {ProjectsComponent} from "./projects.component";
import {ModalAddProjectComponent} from "./modal-add-project/modal-add-project.component";
import {FormAddProjectComponent} from "./modal-add-project/form-add-project/form-add-project.component";
import {TagInputModule} from "ngx-chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbCardModule, NbListModule, NbUserModule, NbIconModule} from "@nebular/theme";
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectMembersComponent } from './modal-add-project/form-add-project/project-members/project-members.component';
import { ProjectMembersViewCell } from './modal-add-project/form-add-project/project-members/project-members-view-cell.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        ColorPickerModule,
        TagInputModule,
        FormsModule,
        Ng2SmartTableModule,
        NbCardModule,
        NgbTabsetModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        NbListModule,
        NbUserModule,
        NbIconModule,
    ],
    declarations: [
        ColorPickerComponent,
        ColorRenderComponent,
        ColorEditorRenderComponent,
        ProjectsComponent,
        ModalAddProjectComponent,
        FormAddProjectComponent,
        ProjectMembersComponent,
        ProjectMembersViewCell
    ],
    providers: [
        ProjectService,
        MatSnackBar,
        NgxSmartModalService,
        NgbModal,
        NgbModalConfig,
        NgbTimepicker,
    ],
    exports: [
        ColorPickerComponent
    ],
    entryComponents: [
        ColorRenderComponent,
        ColorEditorRenderComponent,
        ProjectMembersViewCell,
        ProjectMembersComponent,
    ]
})
export class ProjectsModule {
}
