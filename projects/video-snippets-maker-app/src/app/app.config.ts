import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { VideoPreviewState } from './state/video-preview/video-preview.state';
import { VideoHistoryState } from './state/video-history/video-history.state';
import {
  withNgxsStoragePlugin,
  LOCAL_STORAGE_ENGINE,
} from '@ngxs/storage-plugin';
import { RUNTIME_STORAGE_ENGINE } from './storage/runtime-storage.engine';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      [VideoPreviewState, VideoHistoryState],
      withNgxsStoragePlugin({
        keys: [
          {
            key: VideoPreviewState,
            engine: LOCAL_STORAGE_ENGINE,
          },
          {
            key: VideoHistoryState,
            engine: RUNTIME_STORAGE_ENGINE,
          },
        ],
      })
    ),
  ],
};
