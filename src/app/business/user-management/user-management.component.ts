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
  styleUrl: './user-management.component.css'
})
export default class UserManagementComponent implements OnInit {
    users: UserDetails[] = [];
    headers: string[] = ['User ID', 'User', 'Email', 'Role', 'Status', 'Created At', 'Action'];
    constructor(private userService:UserService) { }
  
    ngOnInit() {
      this.loadUsers();
    }
    loadUsers():void{
      this.userService.getAllUsersDetails().subscribe({
        next:(users) =>{
          this.users = users;
        },
        error:(err) =>{
          console.log(err);
        }
      });
    }
}
