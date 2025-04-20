import { Selector } from '@ngxs/store';
import { ControlPanelState } from './control-panel.state';
import { ControlPanelModel } from './control-panel.model';

export class ControlPanelSelectors {
  @Selector([ControlPanelState])
  static getResolution(state: ControlPanelModel): string {
    return state.resolution;
  }

  @Selector([ControlPanelState])
  static isRecording(state: ControlPanelModel): boolean {
    return state.isRecording;
  }
}
