import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivitiesComponent} from "./activities.component";
import {ModalAddActivityComponent} from "./modal-add-activity/modal-add-activity.component";
import {ModalSelectProjectComponent} from "./modal-select-project/modal-select-project.component";
import {ModalActivitiesFilterComponent} from "./modal-activities-filter/modal-activities-filter.component";
import {
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
} from "./addons/smart-table-datepicker/smart-table-datepicker.component";
import {ActivityService} from "./activity.service";
import {NgbTimepicker, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {TagInputModule} from "ngx-chips";
import {NbCalendarModule, NbCardModule, NbDatepickerModule, NbIconModule} from "@nebular/theme";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DisplayColorRenderComponent } from './display-color-render/display-color-render.component';
import { DisplayColoredCellRenderComponent } from './display-colored-cell-render/display-colored-cell-render.component';

@NgModule({
    imports: [
        CommonModule,
        AngularMultiSelectModule,
        TagInputModule,
        NbCalendarModule,
        NbDatepickerModule,
        Ng2SmartTableModule,
        NbCardModule,
        ReactiveFormsModule,
        FormsModule,
        NbIconModule,
        NgbTimepickerModule,
    ],
    declarations: [
        ActivitiesComponent,
        ModalAddActivityComponent,
        ModalSelectProjectComponent,
        ModalActivitiesFilterComponent,
        SmartTableDatepickerComponent,
        SmartTableDatepickerRenderComponent,
        DisplayColorRenderComponent,
        DisplayColoredCellRenderComponent,
    ],
    providers: [
        ActivityService,
        NgbTimepicker,
    ],
    entryComponents: [
        SmartTableDatepickerComponent,
        SmartTableDatepickerRenderComponent,
        DisplayColorRenderComponent,
        DisplayColoredCellRenderComponent,
    ]
})
export class ActivitiesModule {
}
