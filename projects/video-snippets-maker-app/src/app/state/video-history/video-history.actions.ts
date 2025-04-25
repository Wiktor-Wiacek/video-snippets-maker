export class SaveVideo {
  static readonly type = '[VideoHistory] Save Video';
  constructor(
    public payload: {
      id: string;
      duration: number;
      createdAt: Date;
      thumbnail: Blob;
      video: Blob;
    }
  ) {}
}
export class RemoveVideo {
  static readonly type = '[VideoHistory] Remove Video';
  constructor(public payload: string) {}
}
export class ClearVideoHistory {
  static readonly type = '[VideoHistory] Clear Video History';
}

export class GetVideoHistory {
  static readonly type = '[VideoHistory] Get Video History';
}
