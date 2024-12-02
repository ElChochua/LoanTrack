import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserCreds, User, UserRegister } from '../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url = 'http://localhost:8080/api/v1/auth';
  private refresh_url = 'http://localhost:8080/api/v1/auth/refresh';
  private tokenkey = 'authToken'
  private refreshTokenKey = 'refreshToken';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(private httpClient: HttpClient, private router:Router) {
  }
  login(userCreds: UserCreds):Observable<any>{
    return this.httpClient.post<any>(this.api_url + '/login', userCreds).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
          this.autoRefreshToken();
        }
      }))
  }
  register(user: UserRegister):Observable<any>{
    return this.httpClient.post<any>(this.api_url + '/register', user).pipe(
      tap(response => {console.log(response)})
    );
  }
  private setToken(token:string): void{
      localStorage.setItem(this.tokenkey, token);
  }
  public getToken():string|null{
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
  userGetRole():string |null{
    const token = this.getToken()
    if(!token){
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
  refreshToken():Observable<any>{
    const refreshToken = this.getRefreshToken();
    return this.httpClient.post<any>(this.refresh_url, {refreshToken}).pipe(
      tap(response=>{
        if(response.token){
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
          this.autoRefreshToken();
        }
      })
    )
  }
  setRefreshToken(refreshToken:string):void{
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }
  getRefreshToken():string|null{
    if(typeof window !== 'undefined'){
      return localStorage.getItem('refreshToken');
    }else{
      return null;
    }
  }
  autoRefreshToken():void{
    const token = this.getToken();
    if(!token){
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const timeout = exp - Date.now() - (60*1000);
    setTimeout(() => {
      this.refreshToken().subscribe();
    }, timeout);
  }

}
