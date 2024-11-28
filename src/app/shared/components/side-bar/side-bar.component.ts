import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/UserModel';


@Component({
  selector: 'SideBar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(private authService: AuthService){
  }
  logOut():void{
    this.authService.logout();
  }
}
