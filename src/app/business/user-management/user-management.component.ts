import { Component, OnInit } from '@angular/core';
import { UsersTableComponent } from "./shared/users-table/users-table.component";
import { UserService } from '../../core/services/User/user.service';
import { UserDetails } from '../../models/Users/UserModel';
import { UserDetailTableComponent } from "./shared/users-table/user-detail-table/user-detail-table.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [UserDetailTableComponent, UserDetailTableComponent],
   templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'] // Fix en el nombre
})
export default class UserManagementComponent implements OnInit {
  users: UserDetails[] = [];
  filteredUsers: UserDetails[] = []; // Inicializado como vacío
  headers: string[] = ['User ID', 'User', 'Email', 'Role', 'Status', 'Created At', 'Action'];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Cargar usuarios desde el servicio
  loadUsers(): void {
    this.userService.getAllUsersDetails().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...this.users];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filterUsers(type: string): void {
    if (type === 'all') {
      this.filteredUsers = [...this.users];
    } else if (type === 'active') {
      this.filteredUsers = this.users.filter(user => user.status === 'active');
    } else if (type === 'inactive') {
      this.filteredUsers = this.users.filter(user => user.status === 'inactive');
    } else if (type === 'unassigned') {
      this.filteredUsers = this.users.filter(user => !user.role);
    }
    console.log(this.filteredUsers); // Depuración
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
