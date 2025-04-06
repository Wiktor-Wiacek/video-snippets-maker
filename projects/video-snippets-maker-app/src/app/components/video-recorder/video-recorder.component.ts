import { Component, inject, OnInit } from '@angular/core';
import { VideoRecorderService } from '../../services/video-recorder.service';

@Component({
  selector: 'app-video-recorder',
  imports: [],
  templateUrl: './video-recorder.component.html',
  styleUrl: './video-recorder.component.scss',
})
export class VideoRecorderComponent implements OnInit {
  readonly #recorder = inject(VideoRecorderService);

  state: {
    isRecording: boolean;
    liveStream: MediaStream | null;
  } = {
    isRecording: false,
    liveStream: null,
  };

  ngOnInit(): void {
    this.#recorder.startCamera().then((stream) => {
      this.state.liveStream = stream;
    });
  }

  startRecording() {
    this.#recorder.startRecording();
    this.state.isRecording = true;
  }

  stopRecording() {
    this.#recorder.stopRecording();
    this.state.isRecording = false;
  }
}
