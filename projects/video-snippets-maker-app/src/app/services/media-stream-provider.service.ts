import { inject, Injectable } from '@angular/core';
import { MediaStreamProvider } from '../abstracts/media-stream.provider';
import { NAVIGATOR } from '../abstracts/navigator.token';
import { ResolutionAdvisorService } from './resolution-advisor.service';
import { QualitySetting } from '../models/quality.setting';

@Injectable({
  providedIn: 'root',
})
export class MediaStreamProviderService extends MediaStreamProvider {
  private readonly navigator = inject(NAVIGATOR) as Navigator;
  private readonly resolutionAdvisor = inject(ResolutionAdvisorService);
  private defaultConstraints: MediaStreamConstraints = {
    video: true,
    audio: false,
  };

  async getStream(resolution?: string): Promise<MediaStream> {
    const qualitySetting = resolution
      ? this.resolutionAdvisor.getQualityByResolution(resolution)
      : await this.resolutionAdvisor.getBestResolution();

    const constraints = this.getConstraints(qualitySetting);

    return this.handleMediaStream(qualitySetting!, constraints);
  }

  private getConstraints(
    currentQuality?: QualitySetting
  ): MediaStreamConstraints {
    if (!currentQuality) {
      return this.defaultConstraints;
    }

    return {
      video: {
        width: { ideal: currentQuality.width },
        height: { ideal: currentQuality.height },
        frameRate: { ideal: currentQuality.frameRate },
      },
      audio: false,
    };
  }

  private async handleMediaStream(
    qualitySetting: QualitySetting,
    constraints: MediaStreamConstraints
  ): Promise<MediaStream> {
    return await this.navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const actualSettings = videoTrack.getSettings();
        console.log('Requested quality:', qualitySetting?.resolution);
        console.log(
          'Actual camera resolution:',
          actualSettings.width +
            'x' +
            actualSettings.height +
            ' at ' +
            actualSettings.frameRate +
            'fps'
        );

        return stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera: ' + error.message);
        console.error('Camera error:', error);

        for (const quality of this.resolutionAdvisor.getNextLowerQualityGenerator(
          qualitySetting!
        )) {
          console.log(
            'Trying lower resolution: ' +
              quality.resolution +
              ' (' +
              quality.width +
              'x' +
              quality.height +
              ')'
          );
          return this.getStream(quality.resolution);
        }
        return Promise.reject(error);
      });
  }
}
