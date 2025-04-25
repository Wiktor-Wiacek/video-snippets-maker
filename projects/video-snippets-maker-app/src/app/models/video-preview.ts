import { VideoHistory } from './video-history';

export interface VideoPreview extends VideoHistory {
  video: Blob;
}
