import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer, tap } from 'rxjs';
import { UserCreds } from '../../../models/Users/UserModel';
import { PaymentDto } from '../../../models/loan_payment/Payment';
import { Credits, LoansModel } from '../../../models/Loans/LoansModel';
@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private authService:AuthService, private httpClient:HttpClient) { }
  private api_url = 'http://localhost:8080/api/v1/loan/';
  getAllLoans():Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-all-loans`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getLoansByOrganizationId(organization_id?:number):Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-loans-by-organization/${organization_id}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getLoanById(loan_id:number):Observable<LoansModel>{
    return this.httpClient.get<LoansModel>(`${this.api_url}get-loan/${loan_id}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getLoansByApplicantId(applicant_id:number):Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-loans-by-user/${applicant_id}`).pipe(
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
  getAllActiveLoans():Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-all-active-loans/`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllActiveLoansByMember():Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-all-active-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllInactiveLoansByMember():Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-all-inactive-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllRejectedLoansByMember():Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-all-rejected-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  loanApply(loan:LoansModel):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}loan-apply`,loan).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllApprovedLoansByMember():Observable<LoansModel[]>{
    return this.httpClient.get<LoansModel[]>(`${this.api_url}get-all-approved-loans-by-member/${this.authService.getUserId()}`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllCredits():Observable<Credits[]>{
    return this.httpClient.get<Credits[]>(`${this.api_url}get-all-credits`).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
  getAllCreditsByUser(user_id:number):Observable<Credits[]>{
    return this.httpClient.get<Credits[]>(`${this.api_url}get-all-credits-by-user/${user_id}`).pipe(
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
  getAllCreditsByOrganizationId(organization_id:number):Observable<Credits[]>{
    return this.httpClient.get<Credits[]>(`${this.api_url}get-all-credits-by-organization/${organization_id}`).pipe(
      tap(
         response => {console.log(response)}
        ),
    );
  }
  updateLoan(loan:LoansModel):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-loan`,loan).pipe(
      tap(
         response => {console.log(response)}
      )
    );
  }
}
