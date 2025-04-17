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

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrl: './video-recorder.component.scss',
})
export class VideoRecorderComponent implements OnInit {
  private store = inject(Store);
  private recorder = inject(VideoRecorderService);

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
}
