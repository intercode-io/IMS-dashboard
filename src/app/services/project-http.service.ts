import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseHttpService} from "./base-http.service";
import {Project, ProjectInterface} from "../models/project";

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
  //   return this.http.get<ProjectUserPermissions>(this.baseUrl + `/api/project/getPermissions/projectId=${projectId}&userId=${userId}`);
  // }
}

