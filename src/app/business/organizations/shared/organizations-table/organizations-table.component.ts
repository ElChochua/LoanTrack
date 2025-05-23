import { Component, Inject, OnInit } from '@angular/core';
import { OrganizationDetailsModel, OrganizationModel } from '../../../../models/Organizations/OrganizationModel';
import { OrganizationsService } from '../../../../core/services/organizations-service/organizations.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import ActiveLoansComponent from "../../../loans/shared/active-loans/active-loans.component";

@Component({
  selector: 'app-organizations-table',
  standalone: true,
  imports: [ActiveLoansComponent],
  templateUrl: './organizations-table.component.html',
})
export class OrganizationsTableComponent implements OnInit {
  organizations: OrganizationDetailsModel[] = [];
  constructor(private organizationsService: OrganizationsService, private auth: AuthService) {
  }
  
  ngOnInit(): void {
    this.loadOrganizationsByRole();
  }
  loadOrganizationsByRole(){
    if(this.auth.getRole() === 'SUPER_ADMIN'){
      this.organizationsService.getAllOrganizations().subscribe({
        next: (organizations) => {
          this.organizations = organizations;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }else if(this.auth.getRole() === 'Client'){
      this.organizationsService.getAllOrganizationsByOwner(this.auth.getUserId()).subscribe({
        next: (organizations) => {
          this.organizations = organizations;
      },
      error: (err) => {
        console.error(err);
      }
    });
    }else if(this.auth.getRole() === 'User'){
      this.organizationsService.getAllOrganizationsByMember(this.auth.getUserId()).subscribe({
        next: (organizations) => {
          this.organizations = organizations;
      },
      error: (err) => {
        console.error(err);
      }
    });
    }

  }

}

