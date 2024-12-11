import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { UserService } from '../../../../../core/services/User/user.service';
import { User } from '../../../../../models/Users/UserModel';
import { UsersTableComponent } from "../users-table.component";

@Component({
  selector: 'app-unassigned-users',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './unassigned-users.component.html',
  styleUrl: './unassigned-users.component.css'
})
export class UnassignedUsersComponent implements OnInit {
  constructor(private auth:AuthService,
              private userService:UserService) { }
  users: User[] = [];
  headers: string[] = ['ID', 'Name', 'Email'];
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers():void{
    this.userService.getAllUnassignedUsers().subscribe({
      next:(users) =>{
        this.users = users;
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }
}
