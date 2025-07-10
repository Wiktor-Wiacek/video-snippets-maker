import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SaveVideo } from '../state/video-history/video-history.actions';
import { MediaStreamProvider } from '../abstracts/media-stream.provider';
import { getRandomUUID } from '../utils/uuid';

@Injectable({
  providedIn: 'root',
})
export class VideoRecorderService {
  private store = inject(Store);
  private mediaStreamProvider = inject(MediaStreamProvider);

  #stream: MediaStream | null = null;
  //TODO: Get config from config service
  #config: { duration: number; isMuted: boolean } = {
    duration: 10000,
    isMuted: true,
  };
  #mediaRecorder: MediaRecorder | null = null;

  async startCamera(resolution?: string | undefined): Promise<MediaStream> {
    this.#stream = await this.mediaStreamProvider.getStream(resolution);

    return this.#stream;
  }

  stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }
  }

  startRecording() {
    if (this.#stream) {
      this.handleMediaRecorder(this.#stream);
    }
  }

  stopRecording() {
    this.#mediaRecorder?.stop();
  }

  private handleMediaRecorder(stream: MediaStream) {
    const chunks: Blob[] = [];
    const mediaRecorder = new MediaRecorder(stream);

    this.#mediaRecorder = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const videoBlob = new Blob(chunks, { type: 'video/webm' });
      // Create video element to capture thumbnail
      const videoElement = document.createElement('video');
      const videoUrl = URL.createObjectURL(videoBlob);
      videoElement.src = videoUrl;
      await this.waitForDataToBeLoaded(videoElement);
      const thumbnailBlob = await this.createThumbnail(videoElement);
      if (thumbnailBlob) {
        const id = getRandomUUID();
        const duration = videoElement.duration;
        const createdAt = new Date();
        this.store.dispatch(
          new SaveVideo({
            id,
            duration,
            createdAt,
            thumbnail: thumbnailBlob,
            video: videoBlob,
          })
        );

        // Clean up
        videoElement.pause();
        videoElement.src = '';
        URL.revokeObjectURL(videoUrl);
      }
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), this.#config.duration);
  }

  //TODO: decrease the size of the thumbnail
  createThumbnail(videoElement: HTMLVideoElement): Promise<Blob | null> {
    return new Promise((resolve) => {
      videoElement.currentTime = Math.random() * videoElement.duration;
      const seekedHandler = () => {
        if (videoElement.readyState >= 2) {
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
                videoElement.removeEventListener('seeked', seekedHandler);
              }
            },
            'image/jpeg',
            1
          );
        }
      };
      videoElement.addEventListener('seeked', seekedHandler);
    });
  }

  waitForDataToBeLoaded(videoElement: HTMLVideoElement) {
    return new Promise((resolve, reject) => {
      videoElement.addEventListener('loadedmetadata', () => {
        // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
        if (videoElement.duration === Infinity) {
          videoElement.currentTime = Number.MAX_SAFE_INTEGER;
          videoElement.ontimeupdate = () => {
            videoElement.ontimeupdate = null;
            resolve(videoElement.duration);
            videoElement.currentTime = 0;
          };
        }
        // Normal behavior
        else resolve(videoElement.duration);
      });
      videoElement.onerror = (event) => reject(event);
    });
  }

  //TODO: cleanup
}
