import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap,map} from 'rxjs';
import { UserDetails } from '../../../models/Users/UserModel';
import { OrganizationsMember, OrganizationsModel } from '../../../models/Organizations/Organizations';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private api_url = 'http://localhost:8080/api/v1/organization/';
  constructor(private httpClient: HttpClient, private router:Router) { }
  createOrganization(organization:OrganizationsModel):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}register-organization`, organization).pipe(
      tap(response => {console.log(response.message)})
    );
  }
  getAllOrganizations():Observable<OrganizationsModel[]>{
    return this.httpClient.get<OrganizationsModel[]>(`${this.api_url}get-all-organizations`).pipe(
      tap(response => {console.log(response)})
    );
  }
  getOrganizationsByStatus(status:string):Observable<OrganizationsModel[]>{
    return this.httpClient.get<OrganizationsModel[]>(`${this.api_url}get-organizations-by-status/${status}`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  getOrganizationByOwner(id:number):Observable<OrganizationsModel[]>{
    return this.httpClient.get<OrganizationsModel[]>(`${this.api_url}get-all-organizations-by-owner/${id}`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  registerOrganizationMember(member:OrganizationsMember):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}add-user-to-organization`,member).pipe(
      tap(response => {console.log(response)})
    );
  }
  updateOrganization(organization:OrganizationsModel):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-organization`,organization).pipe(
      //tap(response => {console.log(response)})
    );
  }

  getAllOrganizationsByOwner(userId:number):Observable<OrganizationsModel[]>{
    return this.httpClient.get<OrganizationsModel[]>(`${this.api_url}get-all-organizations-by-owner/${userId}`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  deleteOrganization(organizationId:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.api_url}delete-organization/${organizationId}`).pipe(
      tap(response => {console.log(response)})
    );
  }
  deleteUserFromOrganization(member:OrganizationsMember):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}delete-user-from-organization/`,member).pipe(
      tap(response => {console.log(response)})
    );
  }
  getOrganizationMembers(organizationId:number):Observable<OrganizationsMember[]>{
    return this.httpClient.get<OrganizationsMember[]>(`${this.api_url}get-organization-members/${organizationId}`).pipe(
      //tap(response => {console.log(response)})
    );
  }

  updateOrganizationMember(member:OrganizationsMember):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-member-role`,member).pipe(
      //tap(response => {console.log(response)})
    );
  }
}
