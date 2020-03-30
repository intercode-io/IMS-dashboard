import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: "ngx-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    constructor(private authService: AuthService) {}

    googleLogin() {
        const returnUrl: string = window.history.state.returnUrl;

        this.authService.loginWithGoogle(returnUrl);
    }
}
