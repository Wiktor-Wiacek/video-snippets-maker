import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { VideoHistorySelectors } from '../../state/video-history/video-history.selectors';
import { DialogService } from '../../services/dialog.service';
import { VideoHistoryItemPreviewComponent } from '../video-history-item-preview/video-history-item-preview.component';
import { VideoHistory } from '../../models/video-history';
import { GetVideoHistory } from '../../state/video-history/video-history.actions';
import { GetVideoPreview } from '../../state/video-history-item-preview/video-history-item-preview.actions';

@Component({
  selector: 'app-video-history',
  imports: [],
  templateUrl: './video-history.component.html',
  styleUrl: './video-history.component.scss',
})
export class VideoHistoryComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new GetVideoHistory());
  }

  private readonly dialogService = inject(DialogService);

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

  openVideo(video: VideoHistory): void {
    this.store.dispatch(
      new GetVideoPreview({
        id: video.id,
        thumbnail: video.thumbnail,
        duration: video.duration,
      } as VideoHistory)
    );
    this.dialogService.open(VideoHistoryItemPreviewComponent);
  }
}
