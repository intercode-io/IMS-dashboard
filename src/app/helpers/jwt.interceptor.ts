import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements  HttpInterceptor{
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem("token");

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    localStorage.removeItem("token")
                    this.router.navigate(["login"]);
                }

                return throwError(error);
            })
        );
    }
}
