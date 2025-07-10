import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  ButtonComponent,
  LoaderComponent,
  RecorderComponent,
  SettingsComponent,
  SpinnerComponent,
} from 'ui-components-lib';

@Component({
  selector: 'app-ui-preview',
  standalone: true,
  imports: [
    ButtonComponent,
    SpinnerComponent,
    RecorderComponent,
    LoaderComponent,
    SettingsComponent,
  ],
  templateUrl: './ui-preview.component.html',
  styleUrl: './ui-preview.component.scss',
})
export class UiPreviewComponent implements OnInit, OnDestroy {
  interval: ReturnType<typeof setInterval> | null = null;
  loader = {
    currentTime: signal(0),
    movieLength: signal(10),
  };

  ngOnInit(): void {
    this.runTimmer();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  runTimmer() {
    this.interval = setInterval(() => {
      this.loader.currentTime.set(this.loader.currentTime() + 0.01);
      if (this.loader.currentTime() >= this.loader.movieLength()) {
        this.loader.currentTime.set(0);
      }
    }, 10);
  }
}
