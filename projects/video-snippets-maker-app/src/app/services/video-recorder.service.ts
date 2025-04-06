import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class VideoRecorderService {
  readonly #storage = inject(StorageService);

  #stream: MediaStream | null = null;
  #config: { duration: number } = { duration: 10000 };
  #mediaRecorder: MediaRecorder | null = null;

  async startCamera() {
    this.#stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      // audio: true,
    });

    return Promise.resolve(this.#stream);
  }

  stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
    }
  }

  startRecording() {
    if (this.#stream) {
      this.#handleMediaRecorder(this.#stream);
    }
  }

  stopRecording() {
    this.#mediaRecorder?.stop();
  }

  #handleMediaRecorder(stream: MediaStream) {
    const chunks: Blob[] = [];
    const mediaRecorder = new MediaRecorder(stream);

    this.#mediaRecorder = mediaRecorder;

    // Create video element to capture thumbnail
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.muted = true;
    videoElement.play();

    // Generate thumbnail after a short delay
    let thumbnailBlob: Blob | null = null;
    setTimeout(() => {
      // Create canvas and draw video frame
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            thumbnailBlob = blob;
          }
        },
        'image/jpeg',
        0.8
      );
    }, 2000); // Capture frame after 1 second

    // Handle recording
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const video = new Blob(chunks, { type: 'video/webm' });

      // Wait until thumbnail is generated
      const waitForThumbnail = async () => {
        if (thumbnailBlob) {
          this.#storage.saveVideo(video, thumbnailBlob);

          // Clean up
          videoElement.pause();
          videoElement.srcObject = null;
        } else {
          // Check again in 100ms
          setTimeout(waitForThumbnail, 100);
        }
      };

      waitForThumbnail();
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), this.#config.duration);
  }
}
