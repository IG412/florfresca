import { TestBed, inject } from '@angular/core/testing';

import { ApiPayuService } from './api-payu.service';

describe('ApiPayuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiPayuService]
    });
  });

  it('should be created', inject([ApiPayuService], (service: ApiPayuService) => {
    expect(service).toBeTruthy();
  }));
});
