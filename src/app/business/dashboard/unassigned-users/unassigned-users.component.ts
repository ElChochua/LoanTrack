import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/User/user.service';
import { User } from '../../../models/UserModel';

@Component({
  selector: 'app-unassigned-users',
  standalone: true,
  imports: [],
  templateUrl: './unassigned-users.component.html',
  styleUrl: './unassigned-users.component.css'
})
export class UnassignedUsersComponent implements OnInit {
  constructor(private auth:AuthService,
              private userService:UserService) { }
  users: User[] = [];
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
