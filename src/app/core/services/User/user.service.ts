import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { UserCreds } from '../../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<UserCreds|null> = new BehaviorSubject<UserCreds | null>(null);
  constructor() { }
  getUser():Observable<UserCreds | null>{
    return this.userSubject.asObservable();
  }
  setUser(user:UserCreds){
    this.userSubject.next(user);
  }
}
