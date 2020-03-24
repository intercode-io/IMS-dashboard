/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { MySpinnerComponent } from './extensions/my-spinner/my-spinner.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login"
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        MySpinnerComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ThemeModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
        CoreModule.forRoot(),
        Ng2SmartTableModule,
        SocialLoginModule,
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: () => {
                return new AuthServiceConfig([{
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(environment.googleClientId)
                }])
            },
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent,
        MySpinnerComponent,
    ],
})
export class AppModule {
}
