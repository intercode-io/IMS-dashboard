import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ModalAddProjectComponent } from './projects/modal-add-project/modal-add-project.component';
import { ProjectsComponent } from './projects/projects.component';
import {ProjectHttpService} from "../services/project.http.service";
import {AuthService} from "../services/authentification/auth.service";
import {MatTableModule} from "@angular/material/table";
import { FormAddProjectComponent } from './projects/modal-add-project/form-add-project/form-add-project.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ActivitiesComponent } from './activities/activities.component';
import { ModalAddActivityComponent } from './activities/modal-add-activity/modal-add-activity.component';
import { ModalSelectProjectComponent } from './activities/modal-select-project/modal-select-project.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule, MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    MatTableModule,
    NgbModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  declarations: [
    PagesComponent,
    ModalAddProjectComponent,
    ProjectsComponent,
    FormAddProjectComponent,
    ActivitiesComponent,
    ModalAddActivityComponent,
    ModalSelectProjectComponent,
  ],
  providers: [
    ProjectHttpService,
    AuthService,
    MatSnackBar
  ],
})
export class PagesModule {
}
