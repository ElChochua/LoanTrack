import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/User/user.service';
import { User } from '../../../models/UserModel';
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export  class UsersTableComponent {
  constructor(private router:Router,
              private userService:UserService
  ){}
  users: User[] = [];
  goToEdit(userId:number):void{
    this.router.navigate(['/edit-user', userId]);
  }
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers():void{
    this.userService.getAllUsers().subscribe({
      next:(users) =>{
        this.users = users;
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }
}
