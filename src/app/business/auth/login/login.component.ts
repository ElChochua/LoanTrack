import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { UserCreds } from "../../../models/Users/UserModel";
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInForm: FormGroup;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router){
    this.logInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  login():void{
    if(this.logInForm.valid){
      const userCreds: UserCreds = {
        email: this.logInForm.get('email')?.value,
        password: this.logInForm.get('password')?.value
      };
      this.authService.login(userCreds).subscribe((response => {
        this.router.navigate(['/dashboard']);
      }));
    }else{
      console.log('Form is invalid');
    }
  }
  resetForm():void{
    this.logInForm.reset();
  }
}
