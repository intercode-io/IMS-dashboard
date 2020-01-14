import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerModule} from "@syncfusion/ej2-angular-inputs";
import {MembersChipsComponent} from "./members-chips/members-chips.component";
import {ColorRenderComponent} from "./color-render/color-render.component";
import {ColorEditorRenderComponent} from "./color-editor-render/color-editor-render.component";
import {ColorPickerComponent} from "./color-picker/color-picker.component";
import {AuthService} from "../../services/auth.service";
import {ProjectService} from "./project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSmartModalService} from "ngx-smart-modal";
import {NgbModal, NgbModalConfig, NgbTabsetModule, NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import {ProjectsComponent} from "./projects.component";
import {ModalAddProjectComponent} from "./modal-add-project/modal-add-project.component";
import {FormAddProjectComponent} from "./modal-add-project/form-add-project/form-add-project.component";
import {TagInputModule} from "ngx-chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbCardModule} from "@nebular/theme";
import { MembersChipsEditRenderComponent } from './members-chips-edit-render/members-chips-edit-render.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    ],
    declarations: [
        ColorPickerComponent,
        ColorRenderComponent,
        ColorEditorRenderComponent,
        MembersChipsComponent,
        ProjectsComponent,
        ModalAddProjectComponent,
        FormAddProjectComponent,
        MembersChipsEditRenderComponent,
    ],
    providers: [
        AuthService,
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
        MembersChipsComponent,
        ColorRenderComponent,
        ColorEditorRenderComponent,
        MembersChipsEditRenderComponent,
    ]
})
export class ProjectsModule {
}
