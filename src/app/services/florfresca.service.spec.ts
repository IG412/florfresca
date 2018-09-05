import { TestBed, inject } from '@angular/core/testing';

import { FlorfrescaService } from './florfresca.service';

describe('FlorfrescaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlorfrescaService]
    });
  });

  it('should be created', inject([FlorfrescaService], (service: FlorfrescaService) => {
    expect(service).toBeTruthy();
  }));
});
