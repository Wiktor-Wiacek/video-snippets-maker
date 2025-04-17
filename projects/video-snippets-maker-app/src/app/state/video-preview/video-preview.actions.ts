export class InitializeDefaults {
  static readonly type = '[VideoPreview] Initialize Defaults';
  constructor(public payload: any) {}
}

export class SetResolution {
  static readonly type = '[VideoPreview] Set Resolution';
  constructor(public payload: string) {}
}

export class SetAutoResolution {
  static readonly type = '[VideoPreview] Set Auto Resolution';
  constructor(public payload: string) {}
}

export class StartRecording {
  static readonly type = '[VideoPreview] Start Recording';
}

export class StopRecording {
  static readonly type = '[VideoPreview] Stop Recording';
}
