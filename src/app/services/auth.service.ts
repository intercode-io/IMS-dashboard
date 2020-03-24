import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { CommonHttpService } from "./common-http.service";
import { AuthService as SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { Router } from "@angular/router";
import { NbToastrService, NbGlobalPhysicalPosition, NbToastrConfig } from "@nebular/theme";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
    public user: User = null;

    constructor(
        private commonHttp: CommonHttpService,
        private socialAuthService: SocialAuthService,
        private toastrService: NbToastrService,
        private router: Router
    ) {}

    public loginWithGoogle(returnUrl: string) {
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(externalUser => {
                this.commonHttp
                    .get<User>(
                        `auth/googleLogin?googleIdToken=${externalUser.idToken}`
                    )
                    .pipe(
                        catchError(({ error }) => {
                            this.showErrorToastr(error.message);

                            return of(null);
                        })
                    )
                    .subscribe(user => {
                        if (user) {
                            this.user = user;

                            localStorage.setItem("token", this.user.token);

                            this.router.navigate([returnUrl ? returnUrl : "pages"]);
                        }
                    });
            });
    }

    public logout() {
        this.commonHttp.get("auth/logout").subscribe(() => {
            this.user = null;

            localStorage.removeItem("token");
            this.router.navigate(["login"]);
        });
    }

    public getCurrentUser() {
        return this.commonHttp.get<User>("auth/getCurrentUser").pipe(
            tap(user => this.user = user),
        );
    }

    private showErrorToastr(message) {
        const toastrConfig = {
            status: "danger",
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 5000
        };

        this.toastrService.show(message,"Authentication Error", toastrConfig as NbToastrConfig);
    }
}
