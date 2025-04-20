export abstract class MediaStreamProvider {
  abstract getStream(resolution?: string | undefined): Promise<MediaStream>;
}
