import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private _config: Config | undefined;

  loadConfig() {
    return firstValueFrom(
      this.http.get('/assets/config.json').pipe(
        tap((config) => {
          this._config = config as Config;
        })
      )
    );
  }

  get config() {
    return this._config;
  }
}
