import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrganizationDetailsModel } from '../../../../../models/Organizations/OrganizationModel';
import { OrganizationsService } from '../../../../../core/services/organizations-service/organizations.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-organizations-details-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './organizations-details-table.component.html',
  styleUrl: './organizations-details-table.component.css'
})
export class OrganizationsDetailsTableComponent implements OnInit{
  organizations: OrganizationDetailsModel[] = [];
  constructor(private organizationsService: OrganizationsService, private auth: AuthService) {
  }
  filteredOrganizations: OrganizationDetailsModel[] = [];
  user_role: string|null = null;
  searchValue: string = '';
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

}

