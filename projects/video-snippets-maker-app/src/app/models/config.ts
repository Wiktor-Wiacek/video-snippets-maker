import { QualitySetting } from './quality.setting';

export interface Config {
  availableResolutions: string[];
  defaultResolution: string;
  videoMaxDuration: number;
  connectionTest: {
    testFileUrl: string;
    fileSize: number;
    sampleCount: number;
  };
  qualitySettings: QualitySetting[];
}
