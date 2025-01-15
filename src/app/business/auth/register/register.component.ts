import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from '../../../models/Users/UserModel';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {
  registerForm: FormGroup;
  constructor(private auth:AuthService, 
              public form: FormBuilder,
              private router:Router) { 
                this.registerForm = this.form.group({
                  email :new FormControl('', [Validators.required, Validators.email]),
                  username: new FormControl('', [Validators.required]),
                  password: new FormControl('', [Validators.required]),              });
              }
  
  register():void{
    if(this.registerForm.valid){
       const registerDto:UserRegister = {
        email: this.registerForm.get('email')?.value,
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value
      }
      this.auth.register(registerDto).subscribe((response) => {
        console.log('User registered', response, registerDto);
        this.router.navigate(['/login']);
      });
    }else{
      console.log('Form is invalid');
    }
  }
}
