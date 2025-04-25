import { VideoHistory } from '../../models/video-history';

export class GetVideoPreview {
  static readonly type = '[VideoHistoryItemPreview] Save Video';
  constructor(public payload: VideoHistory) {}
}
