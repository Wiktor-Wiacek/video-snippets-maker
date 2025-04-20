import { Component, input, model, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-lib-recorder',
  imports: [ButtonComponent, LoaderComponent, CommonModule],
  templateUrl: './recorder.component.html',
  styleUrl: './recorder.component.scss',
})
export class RecorderComponent {
  currentTime = model<number>(0);
  movieLength = input<number>(0);

  recordStart = output<void>();
  recoredStop = output<void>();

  isRecording = false;

  startRecording() {
    this.isRecording = true;
    this.recordStart.emit();
  }

  stopRecording() {
    this.isRecording = false;
    this.recoredStop.emit();
  }

  clearState() {
    this.isRecording = false;
    this.currentTime.set(0);
  }
}
