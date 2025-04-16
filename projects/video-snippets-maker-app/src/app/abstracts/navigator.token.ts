import { InjectionToken } from '@angular/core';

export const NAVIGATOR = new InjectionToken<Navigator>('NavigatorToken', {
  providedIn: 'root',
  factory: () => navigator,
});
