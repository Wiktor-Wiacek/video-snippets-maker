import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSnippetMakerComponent } from './video-snippet-maker.component';

describe('VideoSnippetMakerComponent', () => {
  let component: VideoSnippetMakerComponent;
  let fixture: ComponentFixture<VideoSnippetMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSnippetMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSnippetMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
