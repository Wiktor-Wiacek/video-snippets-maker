import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom, tap } from 'rxjs';
import { InitializeDefaults } from '../state/video-preview/video-preview.actions';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private store = inject(Store);

  private config: any;

  loadConfig() {
    return firstValueFrom(
      this.http.get('/assets/config.json').pipe(
        tap((config) => {
          this.config = config;
          this.store.dispatch(new InitializeDefaults(config));
        })
      )
    );
  }

  get setting() {
    return this.config;
  }
}
