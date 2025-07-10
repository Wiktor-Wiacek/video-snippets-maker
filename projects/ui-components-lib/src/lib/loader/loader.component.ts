import { Component, input, OnChanges } from '@angular/core';

@Component({
  selector: 'ui-lib-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnChanges {
  currentTime = input<number>(0);
  movieLength = input<number>(0);

  progressWidth = 0;

  ngOnChanges(): void {
    this.calculateProgressWidth();
  }

  private calculateProgressWidth(): void {
    if (this.movieLength() <= 0) {
      this.progressWidth = 0;
      return;
    }

    // Calculate proportion of movie completed
    const proportion = Math.min(this.currentTime() / this.movieLength(), 1);
    // Calculate width in pixels (max width is 143.5)
    this.progressWidth = Math.max(0, Math.min(proportion * 143.5, 143.5));
  }

  formatTime(seconds: number): string {
    if (!seconds) return '00:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }
}
