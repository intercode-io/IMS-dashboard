import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CommonHttpService } from './common-http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {

    constructor(private commonHttp: CommonHttpService) { }

    public getAllUsers(): Observable<User[]> {
        return this.commonHttp.get<User[]>("users/getAll")
    }
}
