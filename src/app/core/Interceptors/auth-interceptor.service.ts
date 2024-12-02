import { HttpInterceptor, HttpRequest,  HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private auth: AuthService, private router: Router) { }
  private toastTest = new Subject<string>();
  toast = this.toastTest.asObservable();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.auth.getToken();
      let request = req;
      if(token){
        request = req.clone({
          setHeaders:{
            authorization: `Bearer ${ token }`
          }
        })
      }
      return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>
        {
          if(error.status === 401){
            this.toastTest.next('Session expired, please login again');
            this.auth.logout();
            this.router.navigate(['/login']);
          }else if(error.status === 403){
            this.toastTest.next('You do not have permission to access this resource');
            this.router.navigate(['/login']);
          }
          return throwError(error);
        }
    )
  )
    }
}
