import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean | Observable<boolean> {
        if (this.authService.user) {
            return true;
        }

        // Making api call to validate token and get user if application was reloaded
        if (localStorage.getItem("token")) {
            return this.authService.getCurrentUser().pipe(
                switchMap(user => of(!!user))
             )
        }
        else {
            this.router.navigate(["login"], { state: { returnUrl: routerState.url } })

            return false;
        }
    }
}
