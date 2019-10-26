import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseHttpService {
// tslint:disable-next-line:quotemark
  protected baseUrl = "http://localhost:5010";
}
