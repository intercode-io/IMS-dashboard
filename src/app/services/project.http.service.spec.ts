import { TestBed } from '@angular/core/testing';

import { Project.HttpService } from './project.http.service';

describe('Project.HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Project.HttpService = TestBed.get(Project.HttpService);
    expect(service).toBeTruthy();
  });
});
