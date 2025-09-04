import { Component, OnInit } from '@angular/core';  
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../models/Users/UserModel';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
})
  export class SideBarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  userName: string | null = '';
  userMail: string = '';
  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    if (this.authService.isAutenticated()) {
   
      this.userName = this.authService.getUser();
      this.userMail = this.authService.getUserMail();
    }
  }
}
