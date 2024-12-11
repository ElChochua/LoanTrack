import { Component, OnInit } from '@angular/core';
import { OrganizationModel } from '../../../../models/Organizations/OrganizationModel';
import { OrganizationsService } from '../../../../core/services/organizations-service/organizations.service';

@Component({
  selector: 'app-organizations-table',
  standalone: true,
  imports: [],
  templateUrl: './organizations-table.component.html',
  styleUrl: './organizations-table.component.css'
})
export class OrganizationsTableComponent implements OnInit {
  organizations: OrganizationModel[] = [];
  constructor(private organizationsService: OrganizationsService) {
  }
  ngOnInit(): void {
    this.loadOrganizations();
  }
  loadOrganizations(){
    this.organizationsService.getAllOrganizations().subscribe({
      next:(organizations) =>{
        this.organizations = organizations;
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }
}
