import { Injectable, InjectionToken } from '@angular/core';
import { StorageEngine } from '@ngxs/storage-plugin';

export const RUNTIME_STORAGE_ENGINE = new InjectionToken<StorageEngine>(
  'RuntimeStorageEngine',
  {
    providedIn: 'root',
    factory: () => new RuntimeStorageEngine(),
  }
);

@Injectable()
export class RuntimeStorageEngine implements StorageEngine {
  store = new Map<string, unknown>();
  getItem(key: string): unknown {
    return this.store.get(key);
  }

  setItem(key: string, value: unknown): void {
    this.store.set(key, value);
  }
}
