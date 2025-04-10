import { TestBed } from '@angular/core/testing';

import { MediaStreamProviderService } from './media-stream-provider.service';

describe('MediaStreamProviderService', () => {
  let service: MediaStreamProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaStreamProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
