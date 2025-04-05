import { TestBed } from '@angular/core/testing';

import { UiComponentsLibService } from './ui-components-lib.service';

describe('UiComponentsLibService', () => {
  let service: UiComponentsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiComponentsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
