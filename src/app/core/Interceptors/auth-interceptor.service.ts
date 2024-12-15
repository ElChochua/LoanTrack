import { HttpInterceptor, HttpRequest,  HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, Subject } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private auth: AuthService, private router: Router, private toast:ToastrService) { }
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
          if(error.status === 401 && error.error?.error === 'TokenExpired'){
          console.log('Token Expired');
          this.toast.error('Token Expired', 'Error',
            {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              positionClass: 'toast-bottom-right'
            }
          );
          this.auth.logout();
          }else{
            this.toast.error('You do not have permission to access this resource', 'Error',
              {
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                positionClass: 'toast-bottom-right'
              }
            );
          }
          return throwError(error);
        }
    )
  )
    }
}