import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor() { }
  private subject = new BehaviorSubject<boolean>(false);
  loading$ = this.subject.asObservable();
  public show(){
    this.subject.next(true);
  }
  public hide(){
    this.subject.next(false);
  }
}
