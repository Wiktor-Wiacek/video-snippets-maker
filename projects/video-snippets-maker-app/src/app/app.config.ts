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
import { MediaStreamProviderService } from './services/media-stream-provider.service';
import { MediaStreamProvider } from './abstracts/media-stream.provider';
import { ConfigService } from './services/config.service';
import { provideHttpClient } from '@angular/common/http';
import { BandwidthProvider } from './abstracts/bandwidth.provider';
import { BandwidthNativeService } from './services/bandwidth-native.service';
import { BandwidthCustomService } from './services/bandwidth-custom.service';
import { NAVIGATOR } from './abstracts/navigator.token';
import { ControlPanelState } from './state/control-panel/control-panel.state';
import { VideoHistoryItemPreviewState } from './state/video-history-item-preview/video-history-item-preview.state';
import { provideIndexedDb } from 'ngx-indexed-db';
import { DatabaseProvider } from './abstracts/database.provider';
import { NgxIndexedDBProvider } from './database/ngx-indexed-db.provider';
import { indexedDbConfig } from './config/indexed-db.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      const bandwidth = inject(BandwidthProvider);

      return configService.loadConfig().then(() => {
        bandwidth.getBandwidth().then((bandwidth) => {
          console.log('Bandwidth:', bandwidth);
        });
      });
    }),
    provideStore(
      [
        VideoPreviewState,
        VideoHistoryState,
        VideoHistoryItemPreviewState,
        ControlPanelState,
      ],
      withNgxsStoragePlugin({
        keys: [
          {
            key: VideoHistoryState,
            engine: LOCAL_STORAGE_ENGINE,
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
    provideIndexedDb(indexedDbConfig),
    {
      provide: DatabaseProvider,
      useClass: NgxIndexedDBProvider,
    },
  ],
};
