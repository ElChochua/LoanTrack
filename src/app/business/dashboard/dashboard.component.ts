import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UnassignedUsersComponent } from "../user-management/shared/users-table/unassigned-users/unassigned-users.component";
import { User } from '../../models/Users/UserModel';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UnassignedUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  userRole: string |null = null;
  user: User|null = null;
  constructor(private auth: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    if(!this.auth.isAutenticated()){
      this.router.navigate(['/login']);
    }
    this.auth.user$.subscribe((user)=>{
      this.user = user;
    })
    this.userRole = this.auth.userGetRole();
  }
}
