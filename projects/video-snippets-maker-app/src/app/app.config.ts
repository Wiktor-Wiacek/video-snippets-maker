import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
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
import { MediaStreamProviderService } from './services/media-stream-provider.service';
import { MediaStreamProvider } from './abstracts/media-stream.provider';
import { ConfigService } from './services/config.service';
import { provideHttpClient } from '@angular/common/http';
import { BandwidthProvider } from './abstracts/bandwidth.provider';
import { BandwidthNativeService } from './services/bandwidth-native.service';
import { BandwidthCustomService } from './services/bandwidth-custom.service';
import { NAVIGATOR } from './abstracts/navigator.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      return inject(ConfigService).loadConfig();
    }),
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
    {
      provide: MediaStreamProvider,
      useClass: MediaStreamProviderService,
    },
    {
      provide: BandwidthProvider,
      useFactory: () => {
        const navigator = inject(NAVIGATOR) as Navigator & {
          connection?: { downlink: number };
        };
        if (navigator?.connection?.downlink) {
          return inject(BandwidthNativeService);
        } else {
          return inject(BandwidthCustomService);
        }
      },
    },
  ],
};
