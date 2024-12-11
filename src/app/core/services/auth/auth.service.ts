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

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  constructor(private httpClient: HttpClient, private router:Router) {}
  
  login(userCreds: UserCreds){
    return this.httpClient.post<any>(this.api_url + '/login', userCreds, {observe:'response'}).pipe(
      map((response: HttpResponse<any>)=>{
        const body = response.body;
        console.log(body.token);
        if(body && body.token && body.refreshToken && body.user){
          console.log("This shit should be working here ");
          this.setToken(body.token);
          this.setRefreshToken(body.refreshToken);
          console.log(body.user);
        }
      })
    );
  }
  refreshToken():Observable<any>{
    const refreshToken = this.getRefreshToken();
    return this.httpClient.post<any>(this.refresh_url, {refreshToken}).pipe(
      tap((response)=>{
        if(response.token){
          console.log("Esta madre trono aca");
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
