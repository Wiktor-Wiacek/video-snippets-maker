import { Component, inject } from '@angular/core';
import {
  SettingsComponent,
  Setting,
  RecorderComponent,
} from 'ui-components-lib';
import { Store } from '@ngxs/store';
import { VideoPreviewSelectors } from '../../state/video-preview/video-preview.selectors';
import {
  SetResolution,
  StartRecording,
  StopRecording,
} from '../../state/video-preview/video-preview.actions';
@Component({
  selector: 'app-control-panel',
  imports: [SettingsComponent, RecorderComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
})
export class ControlPanelComponent {
  private store = inject(Store);
  interval: any;
  timer = 0;

  availableResolutions = this.store.selectSnapshot(
    VideoPreviewSelectors.getAvailableResolutions
  );
  selectedResolution = this.store.selectSignal(
    VideoPreviewSelectors.getSelectedResolution
  );

  startRecording() {
    this.store.dispatch(new StartRecording());
    this.interval = setInterval(() => {
      this.timer += 0.01;
      if (this.timer >= 10) {
        this.clearTimer;
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
  }
}
