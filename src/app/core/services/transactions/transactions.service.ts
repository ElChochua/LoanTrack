import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transactions } from '../../../models/Transactions/TransactionsModel';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  url = 'http://localhost:8080/api/v1/transactions';
  constructor(private authService:AuthService, private httpClient:HttpClient) { }
  getAllTransactions():Observable<Transactions[]> {
    return this.httpClient.get<Transactions[]>(`${this.url}/get-all-transactions`);
  }
  getAllTransactionsByOrganizationId(organization_id:number):Observable<Transactions[]>{
    return this.httpClient.get<Transactions[]>(`${this.url}/get-all-transactions-by-organization/${organization_id}`);
  }
  getAllTransactionsByUserId(user_id:number):Observable<Transactions[]>{
    return this.httpClient.get<Transactions[]>(`${this.url}/get-all-transactions-by-user/${user_id}`);
  }
}
