import { DBConfig } from 'ngx-indexed-db';
import {
  VIDEO_HISTORY_STORE_NAME,
  VIDEO_PREVIEW_STORE_NAME,
  VIDEO_STORE_NAME,
} from '../constants/db-store';

export interface IndexedDbConfig extends DBConfig {}
export const indexedDbConfig: IndexedDbConfig = {
  name: VIDEO_STORE_NAME,
  version: 1,
  objectStoresMeta: [
    {
      store: VIDEO_HISTORY_STORE_NAME,
      storeConfig: { keyPath: 'id', autoIncrement: false, unique: true },
      storeSchema: [
        { name: 'thumbnail', keypath: 'thumbnail', options: { unique: false } },
      ],
    },
    {
      store: VIDEO_PREVIEW_STORE_NAME,
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'video', keypath: 'video', options: { unique: false } },
      ],
    },
  ],
};
