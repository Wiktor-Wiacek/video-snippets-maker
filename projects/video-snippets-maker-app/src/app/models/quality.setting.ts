export interface QualitySetting {
  /**
   * Unique identifier for the resolution.
   * @unique
   */
  resolution: string;
  width: number;
  height: number;
  frameRate: number;
  label: string;
  quality: string;
  bandwidth: {
    min: number;
    max: number;
  };
}
