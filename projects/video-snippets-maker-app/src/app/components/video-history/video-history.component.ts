import { Component, inject, OnInit, Signal } from '@angular/core';
import { StorageService } from '../../services/storage-service';
import { VideoSnippet } from '../../models/video-snippet';

@Component({
  selector: 'app-video-history',
  imports: [],
  templateUrl: './video-history.component.html',
  styleUrl: './video-history.component.scss',
})
export class VideoHistoryComponent {
  readonly history: Signal<VideoSnippet[]> =
    inject(StorageService).getHistory();

  getImageUrl(video: VideoSnippet): string {
    return video.thumbnail ? URL.createObjectURL(video.thumbnail) : '';
  }
}
