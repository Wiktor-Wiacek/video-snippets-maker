import { Video } from './video';

export interface VideoHistory extends Video {
  thumbnail: Blob;
}
