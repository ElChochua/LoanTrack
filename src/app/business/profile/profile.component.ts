import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDetail } from '../../models/Users/UserModel';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/User/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html'
})
export default class ProfileComponent implements OnInit {
  userProfile: UserDetail = {
    user_id: 0,
    user_name: '',
    email: '',
    name: '',
    last_name: '',
    birthdate: '',
    curp: '',
    created_at: '',
    status: '',
    phone_number: '',
  };
  editMode = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private userService:UserService) {
    
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthdate: ['', Validators.required],
      curp: ['', [Validators.required, Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {
    this.setUserProfile();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.profileForm.patchValue(this.userProfile);
    }
  }
  setUserProfile(){
    this.userService.getUserDetailsById(this.authService.getUserId()).subscribe({
      next: (user) => {
        this.userProfile = user;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Fusionar los datos del formulario con el perfil actual
      const updatedUser: UserDetail = { ...this.userProfile, ...this.profileForm.value };
      this.userService.updateUserDetails(updatedUser).subscribe({
        next: (response) => {
          if(response.code === 200){
            window.location.reload();
          }
        },
        error: (err) => {
          console.error('Error al actualizar el perfil:', err);
        }
      });
    }
  }
  
}