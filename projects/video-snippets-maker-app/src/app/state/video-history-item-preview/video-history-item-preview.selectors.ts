import { Selector } from '@ngxs/store';
import { VideoHistoryItemPreviewState } from './video-history-item-preview.state';
import { VideoHistoryItemPreviewModel } from './video-history-item-preview.model';
import { VideoPreview } from '../../models/video-preview';

export class VideoHistoryItemSelectors {
  @Selector([VideoHistoryItemPreviewState])
  static getVideoHistoryItemPreview(state: VideoHistoryItemPreviewModel) {
    return state as VideoPreview;
  }
}
