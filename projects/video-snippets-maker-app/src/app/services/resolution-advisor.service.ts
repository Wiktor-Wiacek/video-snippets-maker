import { inject, Injectable } from '@angular/core';
import { BandwidthProvider } from '../abstracts/bandwidth.provider';
import { ConfigService } from './config.service';
import { QualitySetting } from '../models/quality.setting';

@Injectable({
  providedIn: 'root',
})
export class ResolutionAdvisorService {
  bandwidth = inject(BandwidthProvider);
  configService = inject(ConfigService);

  async getBestResolution(): Promise<QualitySetting | undefined> {
    const qualitySettings = this.configService.config?.qualitySettings;
    if (!qualitySettings) {
      throw new Error('Quality settings are not defined');
    }

    const bandwidth = await this.bandwidth.getBandwidth();
    const qualitySetting = qualitySettings?.find(
      (setting) =>
        bandwidth >= setting.bandwidth.min && bandwidth < setting.bandwidth.max
    );

    return qualitySetting;
  }

  getNextLowerQuality(quality: QualitySetting): QualitySetting | undefined {
    const qualitySettings = this.configService.config?.qualitySettings;
    if (!qualitySettings) {
      throw new Error('Quality settings are not defined');
    }

    const index = qualitySettings?.findIndex(
      (setting) => setting.resolution === quality.resolution
    );
    if (index !== undefined && index > 0) {
      return qualitySettings?.[index - 1];
    }
    return undefined;
  }

  *getNextLowerQualityGenerator(
    startQuality: QualitySetting
  ): Generator<QualitySetting, void, void> {
    const qualitySettings = this.configService.config?.qualitySettings;

    if (!qualitySettings) {
      throw new Error('Quality settings are not defined');
    }

    let index = qualitySettings?.findIndex(
      (setting) => setting.resolution === startQuality.resolution
    );

    while (index !== undefined && index > 0) {
      index--;
      yield qualitySettings?.[index];
    }
  }

  getQualityByResolution(resolution: string): QualitySetting | undefined {
    const qualitySettings = this.configService.config?.qualitySettings;
    if (!qualitySettings) {
      throw new Error('Quality settings are not defined');
    }

    return qualitySettings?.find(
      (setting) => setting.resolution === resolution
    );
  }
}
