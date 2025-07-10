import { inject, Injectable } from '@angular/core';
import { BandwidthProvider } from '../abstracts/bandwidth.provider';
import { NAVIGATOR } from '../abstracts/navigator.token';

@Injectable({
  providedIn: 'root',
})
export class BandwidthNativeService implements BandwidthProvider {
  private readonly navigator = inject(NAVIGATOR) as Navigator & {
    connection?: { downlink: number; effectiveType?: string };
  };

  getBandwidth(): Promise<number> {
    const connection = this.navigator?.connection;
    console.log('Effective connection type:', connection?.effectiveType);
    console.log('Downlink:', connection?.downlink, 'Mbps');
    return Promise.resolve(this.navigator?.connection?.downlink || 0);
  }
}
