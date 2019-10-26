import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user/user';
// tslint:disable-next-line:quotemark
import {BaseHttpService} from "./base.http.service";

@Injectable()
export class ProjectHttpService extends BaseHttpService {

  public permissions;

  constructor (private http: HttpClient) {
    super();
  }

  getUser(id: Number) {
    return this.http.get<User>(this.baseUrl +'/api/user/get/'+ id);
  }
}
