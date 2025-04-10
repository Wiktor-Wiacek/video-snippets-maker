import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VideoPreviewModel } from './video-preview.model';
import {
  InitializeDefaults,
  SetResolution,
  StartRecording,
  StopRecording,
} from './video-preview.actions';
import { VideoRecorderService } from '../../services/video-recorder.service';

@State<VideoPreviewModel>({
  name: 'VideoPreview',
  defaults: {
    availableResolutions: [''],
    selectedResolution: '',
    isRecording: false,
  },
})
@Injectable()
export class VideoPreviewState {
  private recorder = inject(VideoRecorderService);

  @Action(InitializeDefaults)
  initializeDefaults(
    ctx: StateContext<VideoPreviewModel>,
    action: InitializeDefaults
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableResolutions: action.payload.availableResolutions,
      selectedResolution: action.payload.defaultResolution,
    });
  }

  @Action(StartRecording)
  startRecording(ctx: StateContext<VideoPreviewModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isRecording: true,
    });
    this.recorder.startRecording();
  }

  @Action(StopRecording)
  stopRecording(ctx: StateContext<VideoPreviewModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isRecording: false,
    });

    this.recorder.stopRecording();
  }

  @Action(SetResolution)
  setResolution(ctx: StateContext<VideoPreviewModel>, action: SetResolution) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedResolution: action.payload,
    });
  }
}
