import { Selector } from '@ngxs/store';
import { VideoPreviewModel } from './video-preview.model';
import { VideoPreviewState } from './video-preview.state';

export class VideoPreviewSelectors {
  @Selector([VideoPreviewState])
  static getIsRecording(state: VideoPreviewModel): boolean {
    return state.inPreviewMode;
  }
}
