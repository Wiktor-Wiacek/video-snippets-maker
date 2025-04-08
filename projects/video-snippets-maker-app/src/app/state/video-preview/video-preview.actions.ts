export class SetResolution {
  static readonly type = '[VideoPreview] Set Resolution';
  constructor(public payload: string) {}
}

export class StartRecording {
  static readonly type = '[VideoPreview] Start Recording';
}

export class StopRecording {
  static readonly type = '[VideoPreview] Stop Recording';
}
