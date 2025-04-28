import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSnippetComponent } from './video-snippet.component';

describe('VideoSnippetComponent', () => {
  let component: VideoSnippetComponent;
  let fixture: ComponentFixture<VideoSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSnippetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
