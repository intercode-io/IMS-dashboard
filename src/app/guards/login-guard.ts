import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (!localStorage.getItem("token")) {
            return true;
        }

        if (this.authService.user) {
             return false
        }

        // Making api call to validate token and get user if application was reloaded
        return this.authService.getCurrentUser().pipe(
            map(user => {
                if (user) {
                    this.router.navigate(["pages"]);

                    return false;
                }
            })
        );
    }
}
