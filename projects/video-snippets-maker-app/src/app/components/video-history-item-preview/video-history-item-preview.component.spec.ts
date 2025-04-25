import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHistoryItemPreviewComponent } from './video-history-item-preview.component';

describe('VideoHistoryItemPreviewComponent', () => {
  let component: VideoHistoryItemPreviewComponent;
  let fixture: ComponentFixture<VideoHistoryItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoHistoryItemPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoHistoryItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
