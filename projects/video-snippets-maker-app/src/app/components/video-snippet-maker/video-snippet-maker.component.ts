import { Component } from '@angular/core';
import { VideoHistoryComponent } from '../video-history/video-history.component';
import { VideoRecorderComponent } from '../video-recorder/video-recorder.component';

@Component({
  selector: 'app-video-snippet-maker',
  imports: [VideoRecorderComponent, VideoHistoryComponent],
  templateUrl: './video-snippet-maker.component.html',
  styleUrl: './video-snippet-maker.component.scss',
})
export class VideoSnippetMakerComponent {}
