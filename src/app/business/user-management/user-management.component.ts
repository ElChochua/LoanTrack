import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from "./shared/users-table/users-table.component";
import { UserService } from '../../core/services/User/user.service';
import { UserDetails } from '../../models/Users/UserModel';
import { UserDetailTableComponent } from "./shared/users-table/user-detail-table/user-detail-table.component";
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SpinnerService } from '../../core/services/spinner/spinner.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [UserDetailTableComponent, UserDetailTableComponent, SpinnerComponent, CommonModule],
   templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'] 
})
export default class UserManagementComponent implements OnInit {
  users: UserDetails[] = [];
  headers: string[] = ['User ID', 'User', 'Email', 'Role', 'Status', 'Created At', 'Action'];
  constructor(private userService: UserService, public spinner: SpinnerService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar usuarios desde el servicio
  loadUsers(): void {
    this.userService.getAllUsersDetails().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  modifyUser(user: UserDetails): void {
    console.log(user); // Depuración
  }
  deleteUser(id: number): void {
    this.userService.deleteUserById(id).subscribe({
      next: (response) => {
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
