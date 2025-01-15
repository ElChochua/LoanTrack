import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer, tap } from 'rxjs';
import { LoanApply, Loans, UserCredits } from '../../../models/Loans/LoansModel';
import { UserCreds } from '../../../models/Users/UserModel';
import { PaymentDto } from '../../../models/loan_payment/Payment';
@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private authService:AuthService, private httpClient:HttpClient) { }
  private api_url = 'http://localhost:8080/api/v1/loan/';
  getAllLoans():Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-all-loans`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getLoansByOrganizationId(organization_id:number):Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-loans-by-organization/${organization_id}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getLoanById(loan_id:number):Observable<Loans>{
    return this.httpClient.get<Loans>(`${this.api_url}get-loan/${loan_id}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getLoansByApplicantId(applicant_id:number):Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-loans-by-user/${applicant_id}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  approveLoan(loan_id:number):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}approve-loan/${loan_id}`,{loan_id}).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  rejectLoan(loan_id:number):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}reject-loan/${loan_id}`,{loan_id}).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllActiveLoans():Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-all-active-loans/`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllActiveLoansByMember():Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-all-active-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllInactiveLoansByMember():Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-all-inactive-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllRejectedLoansByMember():Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-all-rejected-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  loanApply(loan:Loans):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}loan-apply`,loan).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllApprovedLoansByMember():Observable<Loans[]>{
    return this.httpClient.get<Loans[]>(`${this.api_url}get-all-approved-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllCreditsByUser(user_id:number):Observable<UserCredits[]>{
    return this.httpClient.get<UserCredits[]>(`${this.api_url}get-all-credits-by-user/${user_id}`).pipe(
      tap(
         response => {console.log(response)}
        ),
    );
  }
  makePayment(payment:PaymentDto):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}make-payment/`,payment).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
}
