import { TestBed } from '@angular/core/testing';

import { VideoRecorderService } from './video-recorder.service';

describe('VideoRecorderService', () => {
  let service: VideoRecorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoRecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
