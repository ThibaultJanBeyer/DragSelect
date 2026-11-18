import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

// Zoneless (the default since Angular 21). ../example-ng19 runs the same app with zone.js.
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
