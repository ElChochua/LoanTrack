import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrganizationDetailsModel, OrganizationModel, OrganizationRegisterModel } from '../../../../../models/Organizations/OrganizationModel';
import { OrganizationsService } from '../../../../../core/services/organizations-service/organizations.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CreateOrganizationComponent } from '../../create-organization/create-organization.component';
import { ToastrService } from 'ngx-toastr';
import { OrganizationMembersModalComponent } from '../../manage-organization-modal/manage-organization.component';
@Component({
  selector: 'app-organizations-details-table',
  standalone: true,
  imports: [FormsModule, CreateOrganizationComponent, OrganizationMembersModalComponent],
  templateUrl: './organizations-details-table.component.html',
  styleUrl: './organizations-details-table.component.css'
})
export class OrganizationsDetailsTableComponent implements OnInit{
  organizations: OrganizationDetailsModel[] = [];
  constructor(private organizationsService: OrganizationsService, private auth: AuthService, private toastService:ToastrService) {
  }
  filteredOrganizations: OrganizationDetailsModel[] = [];
  user_role: string|null = null;
  searchValue: string = '';
  selectedStatus: string = '';
  selectedOrganization:number = 0;
  createOrganizationModalIsOpen: boolean = false;
  manageOrganizationModalIsOpen: boolean = false;
  ngOnInit(): void {
    this.user_role = this.auth.getRole();
    this.loadOrganizationsByRole();
  }

  searchOrganization():void{
    if(!this.searchValue){
      this.filteredOrganizations = this.organizations;
      return;
    }else{
      const search = this.searchValue.toLocaleLowerCase();
      this.filteredOrganizations = this.organizations.filter((organization) => {
        return organization.organization_name.toLowerCase().includes(search);
      });
    }
  }
  loadOrganizationsByRole(){
    if(this.user_role === 'SUPER_ADMIN'){
      console.log('SUPER_ADMIN');
      this.organizationsService.getAllOrganizationsDetails().subscribe({
        next: (organizations) => {
          this.organizations = organizations;
          this.filteredOrganizations = this.organizations;

        },
        error: (err) => {
          console.error(err);
        }
      });
  }else if(this.user_role === 'Client'){
      this.organizationsService.getAllOrganizationsByOwner(this.auth.getUserId()).subscribe({
        next: (organizations) => {
          this.organizations = organizations;
          this.filteredOrganizations = this.organizations;

      },
      error: (err) => {
        console.error(err);
      }
    });
    }else if(this.user_role === 'User'){
      this.organizationsService.getAllOrganizationsByMember(this.auth.getUserId()).subscribe({
        next: (organizations) => {
          this.organizations = organizations;
          this.filteredOrganizations = this.organizations;

      },
      error: (err) => {
        console.error(err);
      }
    });
    }

  }
  createOrganization(organization: OrganizationRegisterModel){
    console.log(organization);
    this.organizationsService.createOrganization(organization).subscribe({
      next: (response) => {
        this.loadOrganizationsByRole();
        this.toastService.success('Organization created successfully ' + response);
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Organization creation failed' + err);
      }
    });
  }
  changeOrganizationStatus(organization_id:number, organization_status:string){
    this.organizationsService.updateOrganizationStatus(organization_id, organization_status).subscribe({
      next: (response) => {
        this.loadOrganizationsByRole();
        this.toastService.success('Organization status updated successfully');
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Organization status update failed');
      }
    });
  }
  openCreateOrganizationModal(){
    this.createOrganizationModalIsOpen = true;
  }
  closeCreateOrganizationModal(){
    this.manageOrganizationModalIsOpen = false;
  }
  closeManageOrganizationModal(){
    this.createOrganizationModalIsOpen = false;
    this.selectedOrganization = 0;
  }
  openManageOrganizationModal(organization_id:number){
    this.selectedOrganization = organization_id;
    this.manageOrganizationModalIsOpen = true;
  }
  removeOrganization(organization_id:number){
    console.log(organization_id);
    this.organizationsService.deleteOrganization(organization_id).subscribe({
      next: (response) => {
        this.loadOrganizationsByRole();
        this.toastService.success('Organization deleted successfully');
        console.log("",response," Organizacion ",organization_id );
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Organization deletion failed');
      }
    });
  }
}

