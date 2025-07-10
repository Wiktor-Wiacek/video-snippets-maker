import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { VideoHistoryItemSelectors } from '../../state/video-history-item-preview/video-history-item-preview.selectors';
import { VideoPreview } from '../../models/video-preview';

@Component({
  selector: 'app-video-history-item-preview',
  imports: [],
  templateUrl: './video-history-item-preview.component.html',
  styleUrl: './video-history-item-preview.component.scss',
})
export class VideoHistoryItemPreviewComponent implements OnDestroy {
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.closeOnEscape) {
      this.close();
    }
  }

  @Input() closeOnBackdropClick = true;
  @Input() closeOnEscape = true;
  @Output() closed = new EventEmitter<void>();

  private readonly preview = inject(Store).selectSignal(
    VideoHistoryItemSelectors.getVideoHistoryItemPreview
  );

  readonly videoPreview = computed(() => {
    const preview = this.preview();
    return {
      ...preview,
      videoObjectURL: this.getImageUrl(preview),
    };
  });

  private getImageUrl(preview: VideoPreview): string {
    return preview.video instanceof Blob
      ? URL.createObjectURL(preview.video)
      : '';
  }

  close(): void {
    this.closed.emit();
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.videoPreview().videoObjectURL);
  }
}
