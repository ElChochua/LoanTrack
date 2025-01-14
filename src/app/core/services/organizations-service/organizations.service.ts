import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap,map} from 'rxjs';
import { AddUserToOrganizationMemberDto, OrganizationDetailsModel, OrganizationMembers, OrganizationModel, OrganizationRegisterModel } from '../../../models/Organizations/OrganizationModel';
import { UserDetails } from '../../../models/Users/UserModel';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private api_url = 'http://localhost:8080/api/v1/organization/';
  constructor(private httpClient: HttpClient, private router:Router) { }
  createOrganization(organization:OrganizationRegisterModel):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}register-organization`, organization).pipe(
      tap(response => {console.log(response.message)})
    );
  }
  getAllOrganizations():Observable<OrganizationDetailsModel[]>{
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-organizations`).pipe(
      tap(response => {console.log(response)})
    );
  }
  getAllOrganizationsDetails():Observable<OrganizationDetailsModel[]>{
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-organizations-details`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  getAllInactiveOrganizations():Observable<OrganizationDetailsModel[]>{
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-inactive-organizations`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  getAllOrganizationsActives():Observable<OrganizationDetailsModel[]>{
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-organizations-actives`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  getOrganizationByOwner(id:number):Observable<OrganizationDetailsModel>{
    return this.httpClient.get<OrganizationDetailsModel>(`${this.api_url}get-all-organizations-by-owner/${id}`).pipe(
     // tap(response => {console.log(response)})
    );
  }
  getAllOrganizationsByMember(userId:number):Observable<OrganizationDetailsModel[]>{
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-organizations-by-user/${userId}`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  addUserToOrganization(member:AddUserToOrganizationMemberDto):Observable<any>{
    return this.httpClient.post<any>(`${this.api_url}add-user-to-organization`,member).pipe(
      tap(response => {console.log(response)})
    );
  }
  updateOrganizationStatus(organization_id:number, organization_status:string):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-organization-status`,{"organization_id":organization_id, "status": organization_status}).pipe(
      //tap(response => {console.log(response)})
    );
  }
  updateOrganizationDetails(organization:OrganizationDetailsModel):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-organization-details`,organization).pipe(
      //tap(response => {console.log(response)})
    );
  }
  getAllOrganizationsByOwner(userId:number):Observable<OrganizationDetailsModel[]>{ 
    return this.httpClient.get<OrganizationDetailsModel[]>(`${this.api_url}get-all-organizations-by-owner/${userId}`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  deleteOrganization(organizationId:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.api_url}delete-organization/${organizationId}`).pipe(
      tap(response => {console.log(response)})
    );
  }
  deleteUserFromOrganization( user_id:number,organization_id:number,):Observable<any>{
    return this.httpClient.delete<any>(`${this.api_url}delete-user-from-organization/${user_id}/${organization_id}`).pipe(
      tap(response => {console.log(response)})
    );
  }
  getOrganizationMembers(organizationId:number):Observable<OrganizationMembers[]>{
    return this.httpClient.get<OrganizationMembers[]>(`${this.api_url}get-organization-members/${organizationId}`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  getAllOutOfOrganizationUsers(organizationId:number):Observable<OrganizationMembers[]>{ 
    return this.httpClient.get<OrganizationMembers[]>(`${this.api_url}get-users-outside-organization/${organizationId}`).pipe(
      //tap(response => {console.log(response)})
    );
  }
  updateMemberRole(member:OrganizationMembers):Observable<any>{
    return this.httpClient.put<any>(`${this.api_url}update-member-role`,member).pipe(
      //tap(response => {console.log(response)})
    );
  }
}
