import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { UnassignedUsersComponent } from "../user-management/shared/users-table/unassigned-users/unassigned-users.component";
import { User } from '../../models/Users/UserModel';
import { OrganizationsTableComponent } from "../organizations/shared/organizations-table/organizations-table.component";
import { UsersTableComponent } from "../user-management/shared/users-table/users-table.component";
import { UserService } from '../../core/services/User/user.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SpinnerService } from '../../core/services/spinner/spinner.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,UnassignedUsersComponent, OrganizationsTableComponent,
            UsersTableComponent, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  userRole: string |null = null;
  user: User|null = null;
  users: User[] = [];
  headers: string[] = ['ID', 'Usuario', 'Correo', 'Rol'];
  constructor(private auth: AuthService, private router: Router,
              private usersService: UserService,
              public spinner:SpinnerService
  ) {
  }
  ngOnInit(): void {
    if(!this.auth.isAutenticated()){
      this.router.navigate(['/login']);
    }
    this.auth.user$.subscribe((user)=>{
      this.user = user;
    })
    this.loadUsers();
    this.userRole = this.auth.userGetRole();
  }
  loadUsers(): void {
    this.usersService.getAllUsers().subscribe((users)=>{
      this.users = users;
    });
  }
}
