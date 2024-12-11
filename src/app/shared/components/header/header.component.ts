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
  user: User|null = null;
  ngOnInit(): void {
    this.authService.user$.subscribe((user)=>{
      console.log("Usuario recibido " + user);
      this.user = user;
    });
  }
  isLogedIn():boolean{
    return this.authService.isAutenticated();
  }
}
