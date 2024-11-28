import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserCreds, User } from '../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url = 'http://localhost:8080/api/v1/auth';
  private tokenkey = 'authToken'
  constructor(private httpClient: HttpClient, private router:Router) {
  }
  login(userCreds: UserCreds):Observable<any>{
    return this.httpClient.post<any>(this.api_url + '/login', userCreds).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
        }
      }))
  }
  private setToken(token:string): void{
      localStorage.setItem(this.tokenkey, token);
  }
  private getToken():string|null{
    return localStorage.getItem(this.tokenkey);
  }
  isAutenticated():boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }
  logout():void{
    localStorage.removeItem(this.tokenkey);
    this.router.navigate(['/login']);
  }
  /*
  autoRefreshToken():void{
    if(!this.isAutenticated()){
      return;
    }
    const token = this.getToken();
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    const refreshTime = exp - now;
    this.httpClient.post<any>(this.api_url + '/refresh', {}).subscribe(response => {
      this.setToken(response.token);
    });
  }*/
}
