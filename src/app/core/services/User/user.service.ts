import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer, tap } from 'rxjs';
import { User, UserCreds } from '../../../models/Users/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url = 'http://localhost:8080/api/v1/';
  constructor(private httpClient: HttpClient, private router:Router) {
  }
  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}superadmin/get-all-users`).pipe(
      tap(response => {console.log(response)})
    );
  }
  getAllUnassignedUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}superadmin/get-users-unassigned`).pipe(
      tap(response => {console.log(response)})
    );
  }
}
