import { Selector } from '@ngxs/store';
import { VideoHistoryState } from './video-history.state';
import { VideoHistoryModel } from './video-history.model';
import { VideoHistory } from '../../models/video-history';

export class VideoHistorySelectors {
  @Selector([VideoHistoryState])
  static getVideoHistory(state: VideoHistoryModel): VideoHistory[] {
    return state.history;
  }
}
