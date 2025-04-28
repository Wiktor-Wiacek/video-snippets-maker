export abstract class DatabaseProvider {
  abstract addVideo(state: { id: string; video: Blob }): Promise<void>;
  abstract removeVideo(id: string): Promise<void>;
  abstract addVideoThumbnail(state: {
    id: string;
    thumbnail: Blob;
  }): Promise<void>;
  abstract removeVideoThumbnail(id: string): Promise<void>;
  abstract getVideo(id: string): Promise<{ id: string; video: Blob }>;
  abstract getVideoHistory(): Promise<{ id: string; thumbnail: Blob }[]>;
}
