import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../models/Users/UserModel';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
user_name:string|null='';
  ngOnInit(): void {
    this.user_name = this.authService.getUser();
  }
  
  isLogedIn():boolean{
    return this.authService.isAutenticated();
  }
}
