import {
  computed,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { StorageService } from './storage-service';
import { VideoSnippet } from '../models/video-snippet';

@Injectable({
  providedIn: 'root',
})
export class RuntimeStorageService extends StorageService {
  #videos: WritableSignal<VideoSnippet[]> = signal([]);
  #history: Signal<VideoSnippet[]> = computed(() =>
    this.#videos().map((video) => ({
      ...video,
      video: undefined,
    }))
  );

  override saveVideo(video: Blob, thumbnail: Blob): Promise<void> {
    this.#videos.update((videos) => [
      ...videos,
      {
        id: crypto.randomUUID(),
        video,
        thumbnail,
        createdAt: new Date(),
      },
    ]);

    return Promise.resolve();
  }
  override getVideo(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  override deleteVideo(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  override getAllVideos(): Promise<VideoSnippet[]> {
    return Promise.resolve(this.#videos());
  }

  override getHistory(): Signal<VideoSnippet[]> {
    return this.#history;
  }
}
