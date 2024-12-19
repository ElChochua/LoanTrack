import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { UnassignedUsersComponent } from "../user-management/shared/users-table/unassigned-users/unassigned-users.component";
import { User } from '../../models/Users/UserModel';
import { OrganizationsTableComponent } from "../organizations/shared/organizations-table/organizations-table.component";
import { UsersTableComponent } from "../user-management/shared/users-table/users-table.component";
import { UserService } from '../../core/services/User/user.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SpinnerService } from '../../core/services/spinner/spinner.service';
import { CommonModule } from '@angular/common';
import { LoansService } from '../../core/services/loans/loans.service';
import { Loans } from '../../models/Loans/LoansModel';
import { LoansTableComponent } from '../loans/shared/loans-table/loans-table.component';
import { CreditTableComponent } from '../loans/shared/credit-table/credit-table.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,UnassignedUsersComponent, OrganizationsTableComponent,
            UsersTableComponent, SpinnerComponent, LoansTableComponent, CreditTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  userRole: string |null = null;
  user: User|null = null;
  users: User[] = [];
  headers: string[] = ['ID', 'Usuario', 'Correo', 'Rol'];
  loans:Loans[] =[];
  constructor(private auth: AuthService, private router: Router,
              private usersService: UserService,
              public spinner:SpinnerService,
              private loanService:LoansService
  ) {
  }
  ngOnInit(): void {
    if(!this.auth.isAutenticated()){
      this.router.navigate(['/login']);
    }
    this.userRole = this.auth.userGetRole();
    if(this.userRole ==='SUPER_ADMIN'){
      this.loadUsers();      
      }else if(this.userRole === 'User'){
        this.loadLoansByUser(this.auth.getUserId());
      }
  }
  loadUsers(): void {
    this.usersService.getAllUsers().subscribe((users)=>{
      this.users = users;
    });
  }
  loadLoansByUser(id: number): void {
    this.loanService.getLoansByApplicantId(id).subscribe({
      next: (loans) => {
        this.loans = loans;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
