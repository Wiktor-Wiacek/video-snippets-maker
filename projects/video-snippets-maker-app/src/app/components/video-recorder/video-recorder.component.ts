import {
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { VideoRecorderService } from '../../services/video-recorder.service';
import { Store } from '@ngxs/store';
import { VideoPreviewSelectors } from '../../state/video-preview/video-preview.selectors';
import {
  SetResolution,
  StartRecording,
  StopRecording,
} from '../../state/video-preview/video-preview.actions';
import { BandwidthProvider } from '../../abstracts/bandwidth.provider';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrl: './video-recorder.component.scss',
})
export class VideoRecorderComponent implements OnInit {
  private store = inject(Store);
  private recorder = inject(VideoRecorderService);
  private bandwidth = inject(BandwidthProvider);

  availableResolutions = this.store.selectSnapshot(
    VideoPreviewSelectors.getAvailableResolutions
  );
  selectedResolution = this.store.selectSignal(
    VideoPreviewSelectors.getSelectedResolution
  );

  state: {
    isRecording: Signal<boolean>;
    liveStream: MediaStream | null;
    bandwidth: WritableSignal<number>;
  } = {
    isRecording: this.store.selectSignal(VideoPreviewSelectors.getIsRecording),
    liveStream: null,
    bandwidth: signal(0),
  };

  ngOnInit(): void {
    this.recorder.startCamera().then((stream) => {
      this.state.liveStream = stream;
    });
  }

  startRecording() {
    this.store.dispatch(new StartRecording());
  }

  stopRecording() {
    this.store.dispatch(new StopRecording());
  }

  setResolution(resolution: string) {
    this.store.dispatch(new SetResolution(resolution));
  }

  getBandwidth() {
    this.bandwidth.getBandwidth().then((bandwidth) => {
      this.state.bandwidth.set(bandwidth);
    });
  }
}
