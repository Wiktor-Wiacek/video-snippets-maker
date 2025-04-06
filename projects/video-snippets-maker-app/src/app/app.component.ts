import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoRecorderComponent } from './components/video-recorder/video-recorder.component';
import { VideoHistoryComponent } from './components/video-history/video-history.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VideoRecorderComponent, VideoHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'video-snippets-maker-app';
}
