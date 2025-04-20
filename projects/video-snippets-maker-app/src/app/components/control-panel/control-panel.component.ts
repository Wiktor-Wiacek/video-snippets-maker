import { Component, inject, viewChild } from '@angular/core';
import {
  SettingsComponent,
  Setting,
  RecorderComponent,
} from 'ui-components-lib';
import { Store } from '@ngxs/store';
import { ControlPanelSelectors } from '../../state/control-panel/control-panel.selectors';
import {
  StartRecording,
  StopRecording,
  SetResolution,
} from '../../state/control-panel/control-panel.actions';
import { ConfigService } from '../../services/config.service';
@Component({
  selector: 'app-control-panel',
  imports: [SettingsComponent, RecorderComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {
  private config = inject(ConfigService);
  private store = inject(Store);

  recorder = viewChild(RecorderComponent);

  interval: any;
  timer = 0;
  maxDuration = this.config.config?.videoMaxDuration ?? 10;
  selectedResolution = this.store.selectSignal(
    ControlPanelSelectors.getResolution
  );

  startRecording() {
    this.store.dispatch(new StartRecording());
    this.interval = setInterval(() => {
      this.timer += 0.01;
      if (this.timer >= 10) {
        this.stopRecording();
      }
    }, 10);
  }

  stopRecording() {
    this.store.dispatch(new StopRecording());
    this.clearTimer();
  }
  setResolution(resolution: Setting | undefined) {
    this.store.dispatch(new SetResolution(resolution?.value ?? ''));
  }

  private clearTimer() {
    this.timer = 0;
    this.interval && clearInterval(this.interval);
    this.recorder()?.clearState();
  }
}
