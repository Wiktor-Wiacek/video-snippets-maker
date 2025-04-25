import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DatabaseProvider } from '../abstracts/database.provider';
import { inject } from '@angular/core';
import { firstValueFrom, map, tap } from 'rxjs';
import {
  VIDEO_HISTORY_STORE_NAME,
  VIDEO_PREVIEW_STORE_NAME,
} from '../constants/db-store';

export class NgxIndexedDBProvider extends DatabaseProvider {
  private dbService = inject(NgxIndexedDBService);

  override addVideo(state: { id: string; video: Blob }): Promise<void> {
    return firstValueFrom(
      this.dbService.add(VIDEO_PREVIEW_STORE_NAME, state).pipe(
        tap(console.log),
        map(() => {
          return;
        })
      )
    );
  }

  override addVideoThumbnail(state: {
    id: string;
    thumbnail: Blob;
  }): Promise<void> {
    return firstValueFrom(
      this.dbService.add(VIDEO_HISTORY_STORE_NAME, state).pipe(
        tap(console.log),
        map(() => {
          return;
        })
      )
    );
  }

  override getVideo(id: string): Promise<{ id: string; video: Blob }> {
    return firstValueFrom(
      this.dbService
        .getByID<{ id: string; video: Blob }>(VIDEO_PREVIEW_STORE_NAME, id)
        .pipe(
          tap(console.log),

          map((result) => ({
            id: result.id,
            video: result.video,
          }))
        )
    );
  }
  override getVideoHistory(): Promise<{ id: string; thumbnail: Blob }[]> {
    return firstValueFrom(
      this.dbService.getAll(VIDEO_HISTORY_STORE_NAME).pipe(tap(console.log))
    );
  }
}
