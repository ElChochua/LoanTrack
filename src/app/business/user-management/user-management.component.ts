import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/User/user.service';
import { UserDetails } from '../../models/Users/UserModel';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SpinnerService } from '../../core/services/spinner/spinner.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ SpinnerComponent, CommonModule],
   templateUrl: './user-management.component.html',
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
        console.log(users); // Depuración
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
