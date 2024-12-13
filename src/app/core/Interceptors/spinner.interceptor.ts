import { HttpInterceptor, HttpRequest,  HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, Subject, map, finalize } from 'rxjs';
import { Route, Router } from '@angular/router';
import { SpinnerService } from '../services/spinner/spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.hide();
        return throwError(error);
      }),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}