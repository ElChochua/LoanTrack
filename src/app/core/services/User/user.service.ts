import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer, tap } from 'rxjs';
import { User, UserCreds, UserDetails } from '../../../models/Users/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url = 'http://localhost:8080/api/v1/';
  constructor(private httpClient: HttpClient, private router:Router) {
  }
  getUserDetailsById(id: number):Observable<UserDetails>{
    return this.httpClient.get<UserDetails>(`${this.api_url}user/get-user-by-id/${id}`).pipe(
    //  tap(response => {console.log(response)})
    );
  }
  updateUserDetails(user:UserDetails):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}user/update-user`,user).pipe(
    //  tap(response => {console.log(response)})
    );
  }
  updateUserRole(user:User):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}superadmin/update-user-role`,user).pipe(
    //  tap(response => {console.log(response)})
    );
  }
  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}superadmin/get-all-users`).pipe(
      tap(
      //  response => {console.log(response)}
      )
    );
  }
  getAllUnassignedUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.api_url}superadmin/get-users-unassigned`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  getAllUsersDetails():Observable<UserDetails[]>{
    return this.httpClient.get<UserDetails[]>(`${this.api_url}superadmin/get-all-users-details`).pipe(
      tap(response => {console.log(response)}  )
  );
  }
  deleteUserById(id: number):Observable<any>{
    return this.httpClient.delete<any>(`${this.api_url}superadmin/delete-user/${id}`).pipe(
    //  tap(response => {console.log(response)})
    );
  }
}
