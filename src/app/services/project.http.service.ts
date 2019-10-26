import {Injectable} from '@angular/core';
import {Project, ProjectInterface} from '../models/project/project';
import {HttpClient} from '@angular/common/http';
import {ActivityInterface} from '../models/activity/activity';
import {BaseHttpService} from './base.http.service';

@Injectable()
export class ProjectHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  createProject(project: Project) {
    return this.http.post<ProjectInterface>(this.baseUrl + '/api/project/create', project);
  }

  getProjectList(userId: Number) {
    return this.http.get<ProjectInterface[]>(this.baseUrl + '/api/project/getList/' + userId);
  }

  // getProjectUserPermission(projectId: Number, userId: Number) {
  //   return this.http.get<ProjectUserPermissions>(this.baseUrl +
  //   `/api/project/getPermissions/projectId=${projectId}&userId=${userId}`);
  // }

  // getActivityList(userId: Number){
  //   return this.http.post<ActivityInterface[]>(this.baseUrl+`/api/timelog/getList/${userId}`)
  // }
  // addActivity()
  getProjectUserActivityList(projectIds: Number[], userId: number) {
    // return this.http.post<ProjectUserPermissions>(this.baseUrl+
    // `/api/project/getPermissions/projectId=${}&userId=${userId}`)
  }
}
