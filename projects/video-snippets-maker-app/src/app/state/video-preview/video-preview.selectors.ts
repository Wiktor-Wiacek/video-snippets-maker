import { Selector } from '@ngxs/store';
import { VideoPreviewModel } from './video-preview.model';
import { VideoPreviewState } from './video-preview.state';

export class VideoPreviewSelectors {
  @Selector([VideoPreviewState])
  static getAvailableResolutions(state: VideoPreviewModel): string[] {
    return state.availableResolutions;
  }
  @Selector([VideoPreviewState])
  static getSelectedResolution(state: VideoPreviewModel): string {
    return state.selectedResolution;
  }
  @Selector([VideoPreviewState])
  static getIsRecording(state: VideoPreviewModel): boolean {
    return state.isRecording;
  }
}
