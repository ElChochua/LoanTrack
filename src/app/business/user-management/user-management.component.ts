import { Component } from '@angular/core';
import { UsersTableComponent } from "./shared/users-table/users-table.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export default class UserManagementComponent {

}
