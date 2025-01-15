import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { UserCreds } from "../../../models/Users/UserModel";
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/User/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInForm: FormGroup;
  constructor(
    private toastService: ToastrService,
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
        this.toastService.success('Login successful','Successful login',
          {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: "toast-bottom-right"
          }
        );
        console.log("Respuesta: ",response);
      }));
    }else{
      console.log('Form is invalid');
    }
  }
  resetForm():void{
    this.logInForm.reset();
  }
}
