import { inject, Injectable } from '@angular/core';
import { BandwidthProvider } from '../abstracts/bandwidth.provider';

@Injectable({
  providedIn: 'root',
})
export class ResolutionAdvisorService {
  bandwidth = inject(BandwidthProvider);

  async getBestResolution(): Promise<string> {
    const bandwidth = await this.bandwidth.getBandwidth();
    if (bandwidth < 2) {
      return '360p';
    } else if (bandwidth >= 2 && bandwidth <= 5) {
      return '720p';
    } else {
      return '1080p';
    }
  }
}
