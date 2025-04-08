export class SaveVideo {
  static readonly type = '[VideoHistory] Save Video';
  constructor(
    public payload: {
      video: Blob;
      thumbnail: Blob;
    }
  ) {}
}
export class RemoveVideo {
  static readonly type = '[VideoHistory] Remove Video';
  constructor(public payload: string) {}
}
export class ClearHistory {
  static readonly type = '[VideoHistory] Clear History';
}
