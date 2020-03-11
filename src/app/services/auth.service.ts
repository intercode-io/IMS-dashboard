import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/user";
import {CommonHttpService} from "./common-http.service";

@Injectable({providedIn: 'root'})
export class AuthService {

    private userSource: BehaviorSubject<User> = new BehaviorSubject<User>(new User(2, "Alex"));
    public user$: Observable<User> = this.userSource.asObservable();

    constructor() {
    }

    public announceUserChange(user: User) {
        this.userSource.next(user);
    }

    //todo: Complete authentication service
}
