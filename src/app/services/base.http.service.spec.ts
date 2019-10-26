import { TestBed } from '@angular/core/testing';

import { Base.HttpService } from './base.http.service';

describe('Base.HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Base.HttpService = TestBed.get(Base.HttpService);
    expect(service).toBeTruthy();
  });
});
