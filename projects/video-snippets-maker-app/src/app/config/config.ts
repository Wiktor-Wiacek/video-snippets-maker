import { QualitySetting } from '../models/quality.setting';
import { IndexedDbConfig } from './indexed-db.config';

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
  // indexedDb: IndexedDbConfig;
}
