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
  store = new Map<string, any>();
  getItem(key: string): any {
    this.store.get(key);
  }

  setItem(key: string, value: any): void {
    this.store.set(key, value);
  }
}
