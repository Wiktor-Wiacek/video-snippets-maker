import { Component, inject, input } from '@angular/core';
import { VideoSnippet } from '../../models/video-snippet';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ButtonComponent } from 'ui-components-lib';
import { Store } from '@ngxs/store';
import { VideoHistory } from '../../models/video-history';
import { DialogService } from '../../services/dialog.service';
import { GetVideoPreview } from '../../state/video-history-item-preview/video-history-item-preview.actions';
import { VideoHistoryItemPreviewComponent } from '../video-history-item-preview/video-history-item-preview.component';
import { RemoveVideo } from '../../state/video-history/video-history.actions';

@Component({
  selector: 'app-video-snippet',
  imports: [DatePipe, DecimalPipe, ButtonComponent],
  templateUrl: './video-snippet.component.html',
  styleUrl: './video-snippet.component.scss',
})
export class VideoSnippetComponent {
  private readonly store = inject(Store);
  private readonly dialogService = inject(DialogService);
  video = input.required<VideoSnippet>();

  trashIconVisible = false;

  openVideo(): void {
    const video = this.video();
    this.store.dispatch(
      new GetVideoPreview({
        id: video.id,
        thumbnail: video.thumbnail,
        duration: video.duration,
      } as VideoHistory)
    );
    this.dialogService.open(VideoHistoryItemPreviewComponent);
  }
  removeVideo(): void {
    this.store.dispatch(new RemoveVideo(this.video().id));
  }
  showTrashIcon(): void {
    this.trashIconVisible = true;
  }
  hideTrashIcon(): void {
    this.trashIconVisible = false;
  }
}
