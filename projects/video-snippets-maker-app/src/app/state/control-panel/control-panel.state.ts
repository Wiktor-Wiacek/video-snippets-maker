import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VideoRecorderService } from '../../services/video-recorder.service';
import { ControlPanelModel } from './control-panel.model';
import {
  StartRecording,
  StopRecording,
  SetResolution,
} from './control-panel.actions';

@State<ControlPanelModel>({
  name: 'ControlPanel',
  defaults: {
    resolution: '',
    isRecording: false,
  },
})
@Injectable()
export class ControlPanelState {
  private recorder = inject(VideoRecorderService);

  @Action(StartRecording)
  startRecording(ctx: StateContext<ControlPanelModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isRecording: true,
    });
    this.recorder.startRecording();
  }

  @Action(StopRecording)
  stopRecording(ctx: StateContext<ControlPanelModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isRecording: false,
    });

    this.recorder.stopRecording();
  }

  @Action(SetResolution)
  setResolution(ctx: StateContext<ControlPanelModel>, action: SetResolution) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      resolution: action.payload,
    });
  }
}
