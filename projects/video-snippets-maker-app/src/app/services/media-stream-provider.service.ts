import { Injectable } from '@angular/core';
import { MediaStreamProvider } from './abstracts/media-stream.provider';

@Injectable({
  providedIn: 'root',
})
export class MediaStreamProviderService extends MediaStreamProvider {
  async getStream() {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });
  }
}
