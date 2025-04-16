import { TestBed } from '@angular/core/testing';

import { BandwidthNativeService } from './bandwidth-native.service';

describe('BandwidthNativeService', () => {
  let service: BandwidthNativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandwidthNativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
