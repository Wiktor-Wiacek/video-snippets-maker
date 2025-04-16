import { TestBed } from '@angular/core/testing';

import { BandwidthCustomService } from './bandwidth-custom.service';

describe('BandwidthCustomService', () => {
  let service: BandwidthCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandwidthCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
