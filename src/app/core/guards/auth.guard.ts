import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private authService: AuthService, private router:Router) { }
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    if(this.authService.isAutenticated()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
