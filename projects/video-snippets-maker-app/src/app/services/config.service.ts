import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom, tap } from 'rxjs';
// import { InitializeDefaults } from '../state/video-preview/video-preview.actions';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private store = inject(Store);

  private _config: Config | undefined;

  loadConfig() {
    return firstValueFrom(
      this.http.get('/assets/config.json').pipe(
        tap((config) => {
          this._config = config as Config;
          // this.store.dispatch(new InitializeDefaults(config));
        })
      )
    );
  }

  get config() {
    return this._config;
  }
}
