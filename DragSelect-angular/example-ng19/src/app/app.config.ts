import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// The only file that differs from ../example: this app runs with zone.js.
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
};
