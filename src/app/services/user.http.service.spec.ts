import { TestBed } from '@angular/core/testing';

import { User.HttpService } from './user.http.service';

describe('User.HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User.HttpService = TestBed.get(User.HttpService);
    expect(service).toBeTruthy();
  });
});
