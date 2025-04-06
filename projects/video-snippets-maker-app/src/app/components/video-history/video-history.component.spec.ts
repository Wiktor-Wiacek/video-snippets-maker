import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHistoryComponent } from './video-history.component';

describe('VideoHistoryComponent', () => {
  let component: VideoHistoryComponent;
  let fixture: ComponentFixture<VideoHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
