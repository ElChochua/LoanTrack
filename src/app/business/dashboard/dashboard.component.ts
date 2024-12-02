import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UnassignedUsersComponent } from "./unassigned-users/unassigned-users.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UnassignedUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  userRole: string |null = null;
  constructor(private auth: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    if(!this.auth.isAutenticated()){
      this.router.navigate(['/login']);
    }
    this.userRole = this.auth.userGetRole();
  }
}
