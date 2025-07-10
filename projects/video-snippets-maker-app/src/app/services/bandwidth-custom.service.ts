import { inject, Injectable } from '@angular/core';
import { BandwidthProvider } from '../abstracts/bandwidth.provider';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize, tap, timeout } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class BandwidthCustomService extends BandwidthProvider {
  private readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  private testFileUrl: string;
  private fileSize: number;
  private sampleCount: number;

  constructor() {
    super();
    const settings = this.configService.config;
    if (settings) {
      this.testFileUrl = settings.connectionTest.testFileUrl;
      this.fileSize = settings.connectionTest.fileSize;
      this.sampleCount = settings.connectionTest.sampleCount;
    } else {
      throw new Error('ConfigService settings are undefined');
    }
  }

  override getBandwidth(): Promise<number> {
    return this.measureBandwidth();
  }

  /**
   * Measures user bandwidth when app loads
   * Returns observable that emits bandwidth in Mbps
   */
  async measureBandwidth(): Promise<number> {
    return await this.runBandwidthTest();
  }

  private async runBandwidthTest() {
    try {
      const speeds: number[] = [];

      // Run multiple tests to get a better average
      for (let i = 0; i < this.sampleCount; i++) {
        const speed = await this.performSingleTest();
        if (speed > 0) {
          speeds.push(speed);
        }
        // Small delay between tests
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Calculate average speed
      const avgSpeed =
        speeds.length > 0
          ? speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length
          : 0;

      console.log(`Average bandwidth: ${avgSpeed.toFixed(2)} Mbps`);
      return avgSpeed;
    } catch (error) {
      console.error('Bandwidth test failed:', error);
      // Default to a conservative bandwidth estimate on error
      return 1.0;
    }
  }

  private async performSingleTest(): Promise<number> {
    return new Promise((resolve) => {
      const startTime = new Date().getTime();

      // Add a cache-busting parameter
      const cacheBuster = `?cb=${new Date().getTime()}`;
      const url = this.testFileUrl + cacheBuster;

      // Use Angular's HttpClient instead of XMLHttpRequest
      this.http
        .get(url, {
          responseType: 'arraybuffer',
          reportProgress: true,
          observe: 'response',
        })
        .pipe(
          timeout(10000), // 10 second timeout
          tap(() => {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000; // seconds
            const bitsLoaded = this.fileSize * 8;
            const bps = bitsLoaded / duration;
            const mbps = bps / 1024 / 1024;
            resolve(mbps);
          }),
          catchError((error) => {
            console.error('HTTP error during bandwidth test', error);
            resolve(0);
            return of(null); // Return observable that emits null
          }),
          finalize(() => {
            // This will run regardless of success or error
            if (new Date().getTime() - startTime > 10000) {
              console.warn('Bandwidth test timed out');
              resolve(0);
            }
          })
        )
        .subscribe();
    });
  }
}
