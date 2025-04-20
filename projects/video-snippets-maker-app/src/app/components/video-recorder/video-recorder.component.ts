import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { VideoRecorderService } from '../../services/video-recorder.service';
import { Store } from '@ngxs/store';
import { ControlPanelSelectors } from '../../state/control-panel/control-panel.selectors';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrl: './video-recorder.component.scss',
})
export class VideoRecorderComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private recorder = inject(VideoRecorderService);
  private resolution = this.store.selectSignal(
    ControlPanelSelectors.getResolution
  );

  stream: MediaStream | undefined;

  constructor() {
    effect(async () => {
      const resolution = this.resolution();
      this.recorder.stopCamera();
      this.stream = await this.recorder.startCamera(resolution);
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.stream = await this.recorder.startCamera();
    } catch (error) {
      //TODO: Toast error
      console.error('Error accessing camera: ', error);
    }
  }

  ngOnDestroy() {
    this.recorder.stopCamera();
  }
}
