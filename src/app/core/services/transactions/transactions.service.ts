import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { TransactionsModel } from '../../../models/Transactions/TransactionsModel';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  url = 'http://localhost:8080/api/v1/transactions';
  constructor(private authService:AuthService, private httpClient:HttpClient) { }
  getAllTransactions():Observable<TransactionsModel[]> {
    return this.httpClient.get<TransactionsModel[]>(`${this.url}/get-all-transactions`);
  }
  getAllTransactionsByOrganizationId(organization_id:number):Observable<TransactionsModel[]>{
    return this.httpClient.get<TransactionsModel[]>(`${this.url}/get-all-transactions-by-organization/${organization_id}`);
  }
  getAllTransactionsByUserId(user_id:number):Observable<TransactionsModel[]>{
    return this.httpClient.get<TransactionsModel[]>(`${this.url}/get-all-transactions-by-user/${user_id}`);
  }
}
