import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../models/Users/UserModel';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isProfileMenuOpen = false
  isNotificationsOpen = false

  ngOnInit(): void {
    
  }
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen
    if (this.isProfileMenuOpen) {
      this.isNotificationsOpen = false
    }
  }

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen
    if (this.isNotificationsOpen) {
      this.isProfileMenuOpen = false
    }
  }
}
