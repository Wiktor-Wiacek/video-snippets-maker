import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VideoPreviewModel } from './video-preview.model';
import {
  SetResolution,
  StartRecording,
  StopRecording,
} from './video-preview.actions';
import { VideoRecorderService } from '../../services/video-recorder.service';

@State<VideoPreviewModel>({
  name: 'VideoPreview',
  defaults: {
    availableResolutions: ['640x360', '1280x720', '1920x1080', '3840x2160'],
    selectedResolution: '1920x1080',
    isRecording: false,
  },
})
@Injectable()
export class VideoPreviewState {
  private recorder = inject(VideoRecorderService);

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
