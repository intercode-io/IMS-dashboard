import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { NbAuthBlockComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../guards/auth-guard';
import { LoginGuard } from '../../guards/login-guard';

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    RouterModule,
  ],
  declarations: [
    NbAuthBlockComponent,
    LoginComponent
  ],
  exports: [
    NbAuthBlockComponent,
    LoginComponent
  ],
  providers: [
    AuthGuard,
    LoginGuard,
  ],
})
export class AuthModule {
}
