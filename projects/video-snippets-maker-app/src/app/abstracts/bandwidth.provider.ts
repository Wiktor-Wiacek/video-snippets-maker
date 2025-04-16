export abstract class BandwidthProvider {
  abstract getBandwidth(): Promise<number>;
}
