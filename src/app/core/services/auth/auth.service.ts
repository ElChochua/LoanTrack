import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { UserCreds, User, UserRegister } from '../../../models/Users/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url = 'http://localhost:8080/api/v1/auth';
  private refresh_url = 'http://localhost:8080/api/v1/auth/refresh';
  private tokenkey = 'authToken'
  private refreshTokenKey = 'refreshToken';
  private user_name = 'User';
  private user_id = 'user_id';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  constructor(private httpClient: HttpClient, private router:Router) {}
  login(userCreds: UserCreds) {
    return this.httpClient.post<any>(this.api_url + '/login', userCreds, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const body = response.body;
        if (body && body.token && body.refreshToken && body.user) {
          this.setToken(body.token);
          this.setRefreshToken(body.refreshToken);  
          this.setUsername(body.user.user);    
          this.setUserId(body.user.user_id);
        }
      })
    );
  }  
  setUserId(userId:number):void{
    localStorage.setItem(this.user_id.toString(), userId.toString());
  }
  getUserId():number{
    const userId = localStorage.getItem(this.user_id);
    if(userId){
      return parseInt(userId);
    }else{
      return 0;
    }
  }
  setUser(user:User):void{
    this.userSubject.next(user);
    console.log(user);
  }
  setUsername(user:string):void{
    localStorage.setItem(this.user_name, user);
  }

  getUser():string | null{
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.user_name);
    }else{
      return null;
    }
  }
  getRole():string|null{
    const token = this.getToken();
    if(!token){
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; 
  }
  refreshToken():Observable<any>{
    const refreshToken = this.getRefreshToken();
    console.log(refreshToken);
    return this.httpClient.post<any>(this.refresh_url, {refreshToken}).pipe(
      tap((response)=>{
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
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.user_name);
    localStorage.removeItem(this.user_id);
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
 
  getRefreshToken():string|null{
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.refreshTokenKey);
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