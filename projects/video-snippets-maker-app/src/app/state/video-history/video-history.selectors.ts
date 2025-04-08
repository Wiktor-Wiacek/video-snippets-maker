import { Selector } from '@ngxs/store';
import { VideoHistoryState } from './video-history.state';
import { VideoHistoryModel } from './video-history.model';
import { VideoSnippet } from '../../models/video-snippet';

export class VideoHistorySelectors {
  @Selector([VideoHistoryState])
  static getVideoHistory(state: VideoHistoryModel): VideoSnippet[] {
    return state.history;
  }
}
