import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { VideoHistorySelectors } from '../../state/video-history/video-history.selectors';
import { VideoHistory } from '../../models/video-history';
import { GetVideoHistory } from '../../state/video-history/video-history.actions';
import { VideoSnippetComponent } from '../video-snippet/video-snippet.component';

@Component({
  selector: 'app-video-history',
  imports: [VideoSnippetComponent],
  templateUrl: './video-history.component.html',
  styleUrl: './video-history.component.scss',
})
export class VideoHistoryComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new GetVideoHistory());
  }

  private readonly history = this.store.selectSignal(
    VideoHistorySelectors.getVideoHistory
  );

  readonly videoHistory = computed(() => {
    return this.history().map((video) => ({
      ...video,
      thumbnailObjectURL: this.getImageUrl(video),
    }));
  });

  getImageUrl(video: VideoHistory): string {
    return video.thumbnail instanceof Blob
      ? URL.createObjectURL(video.thumbnail)
      : '';
  }
}
