export abstract class MediaStreamProvider {
  abstract getStream(): Promise<MediaStream>;
}
