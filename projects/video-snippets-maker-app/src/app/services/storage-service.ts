import { Signal } from '@angular/core';
import { VideoSnippet } from '../models/video-snippet';

export abstract class StorageService {
  abstract saveVideo(video: Blob, thumbnail: Blob): Promise<void>;
  abstract getVideo(id: string): Promise<string>;
  abstract deleteVideo(id: string): Promise<void>;
  abstract getAllVideos(): Promise<VideoSnippet[]>;
  abstract getHistory(): Signal<VideoSnippet[]>;
}
