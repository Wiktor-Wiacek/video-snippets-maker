import { Component, inject, Signal } from '@angular/core';
import { VideoSnippet } from '../../models/video-snippet';
import { Store } from '@ngxs/store';
import { VideoHistorySelectors } from '../../state/video-history/video-history.selectors';

@Component({
  selector: 'app-video-history',
  imports: [],
  templateUrl: './video-history.component.html',
  styleUrl: './video-history.component.scss',
})
export class VideoHistoryComponent {
  readonly history = inject(Store).selectSignal(
    VideoHistorySelectors.getVideoHistory
  );

  getImageUrl(video: VideoSnippet): string {
    return video.thumbnail ? URL.createObjectURL(video.thumbnail) : '';
  }
}
