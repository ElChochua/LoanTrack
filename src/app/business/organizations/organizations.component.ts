import { Component } from '@angular/core';
import { OrganizationsDetailsTableComponent } from './shared/organization-details-table/organizations-details-table/organizations-details-table.component';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [OrganizationsDetailsTableComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export default class OrganizationsComponent {

}
