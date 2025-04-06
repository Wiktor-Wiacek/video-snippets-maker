import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { RuntimeStorageService } from './services/runtime-storage.service';
import { StorageService } from './services/storage-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: StorageService,
      useClass: RuntimeStorageService,
    },
  ],
};
