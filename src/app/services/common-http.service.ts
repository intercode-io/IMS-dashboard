import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base-http.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CommonHttpService extends BaseHttpService {

    constructor(private http: HttpClient) {
        super();
    }

    post<T>(url, obj) {
        return this.http.post<T>(this.baseUrl + '/api/' + url, obj);
    }


    get<T>(url) {
        return this.http.get<T>(this.baseUrl + '/api/' + url);
    }
}
