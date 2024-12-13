import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap,map} from 'rxjs';
import { OrganizationDetailsModel, OrganizationModel } from '../../../models/Organizations/OrganizationModel';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private api_url = 'http://localhost:8080/api/v1/organization/';
  constructor(private httpClient: HttpClient, private router:Router) { }
  getAllOrganizations():Observable<OrganizationModel[]>{
    return this.httpClient.get<OrganizationModel[]>(`${this.api_url}get-all-organizations`).pipe(
      tap(response => {console.log(response)})
    );
  }
  getAllOrganizationsDetails():Observable<OrganizationDetailsModel[]>{
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-organizations-details`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  getAllInactiveOrganizations():Observable<OrganizationModel[]>{
    return this.httpClient.get<OrganizationModel[]>(`${this.api_url}get-all-inactive-organizations`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  getOrganizationByOwner(id:number):Observable<OrganizationModel>{
    return this.httpClient.get<OrganizationModel>(`${this.api_url}get-organization-by-owner/${id}`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  addUserToOrganization(userId:number, organizationId:number):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}add-user-to-organization`,{userId, organizationId}).pipe(
      //tap(response => {console.log(response)})
    );
  }
  updateOrganizationStatus(organization_id:number, organization_status:string):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-organization-status`,{organization_id, organization_status}).pipe(
      //tap(response => {console.log(response)})
    );
  }
}
