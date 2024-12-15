import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors,withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './core/Interceptors/auth-interceptor.service';
import { SpinnerInterceptor } from './core/Interceptors/spinner.interceptor';
import { AuthService } from './core/services/auth/auth.service';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi(),withFetch()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
    deps: [AuthService]
  },
  {
  provide: HTTP_INTERCEPTORS,
  useClass: SpinnerInterceptor,
  multi: true
  }
]
};
