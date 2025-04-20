export class SetResolution {
  static readonly type = '[ControlPanel] Set Resolution';
  constructor(public payload: string) {}
}
export class StartRecording {
  static readonly type = '[ControlPanel] Start Recording';
}

export class StopRecording {
  static readonly type = '[ControlPanel] Stop Recording';
}
