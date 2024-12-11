import { Component, OnInit } from '@angular/core';  
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../models/Users/UserModel';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
  export class SideBarComponent implements OnInit{
  constructor(private authService: AuthService){
  }
  userRole: string | null = null;
  ngOnInit(): void {
    this.userRole = this.authService.userGetRole();

  }  
  logOut():void{
    this.authService.logout();
  }
}
