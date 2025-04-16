import { TestBed } from '@angular/core/testing';

import { ResolutionAdvisorService } from './resolution-advisor.service';

describe('ResolutionAdvisorService', () => {
  let service: ResolutionAdvisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolutionAdvisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
