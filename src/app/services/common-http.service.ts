import { Injectable } from '@angular/core';
import {BaseHttpService} from "./base-http.service";
import {HttpClient} from "@angular/common/http";
import {ProjectInterface} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  post (url, obj) {
    return this.http.post(this.baseUrl + url, obj);
  }

  get (url, obj) {
    return this.http.get(this.baseUrl + url + obj);
  }
}