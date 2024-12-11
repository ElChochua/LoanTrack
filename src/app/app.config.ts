import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors,withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './core/Interceptors/auth-interceptor.service';
import { AuthService } from './core/services/auth/auth.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi(),withFetch()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
    deps: [AuthService]
  }
]
};
