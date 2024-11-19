import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { UserCreds } from '../../models/userCredetntials.model';
import { UserService } from '../../service/User/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInForm: FormGroup;
  
  user: UserCreds | null = null;
  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder){
    this.logInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  onSubmit(){

  }
  
}
