// import { Injectable, inject } from '@angular/core';
// import { DatabaseProvider } from '../abstracts/database.provider';
// import { NgxIndexedDBService } from 'ngx-indexed-db';

// @Injectable({
//   providedIn: 'root',
// })
// export class NgxIndexedDBProvider extends DatabaseProvider {
//   private cachedState: any = null;
//   private isInitialized = false;
//   private storeName: string;
//   private stateKey: string;

//   private dbService = inject(NgxIndexedDBService);
//   private config = inject(STORAGE_CONFIG);

//   constructor() {
//     if (!this.config.indexedDb) {
//       throw new Error('IndexedDB configuration is required');
//     }

//     this.storeName = this.config.indexedDb.storeName;
//     this.stateKey = this.config.indexedDb.stateKey;
//   }

//   async initialize(): Promise<void> {
//     if (this.isInitialized) return;

//     try {
//       // Try to get initial state
//       const result = await this.dbService.getByKey(
//         this.storeName,
//         this.stateKey
//       );
//       if (result) {
//         this.cachedState = result.state;
//       }
//       this.isInitialized = true;
//     } catch (error) {
//       console.error('Failed to initialize NgxIndexedDBProvider', error);
//     }
//   }

//   get(): any {
//     return this.cachedState;
//   }

//   set(state: any): void {
//     this.cachedState = state;

//     // Using ngx-indexed-db to store the state
//     this.dbService
//       .update(this.storeName, { id: this.stateKey, state })
//       .catch((error) => {
//         // If update fails (possibly because the record doesn't exist yet), try to add it
//         if (error) {
//           this.dbService
//             .add(this.storeName, { id: this.stateKey, state })
//             .catch((err) =>
//               console.error('Error adding state to IndexedDB', err)
//             );
//         }
//       });
//   }
// }
