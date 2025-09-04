import { Component, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/Users/UserModel';
import { UserService } from '../../core/services/User/user.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SpinnerService } from '../../core/services/spinner/spinner.service';
import { CommonModule } from '@angular/common';
import { LoansService } from '../../core/services/loans/loans.service';

import { OrganizationsService } from '../../core/services/organizations-service/organizations.service';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from "../../shared/components/header/header.component";

interface LoanSummary {
  totalLoans: number
  activeLoans: number
  pendingApproval: number
  totalAmount: number
  paidAmount: number
}

interface RecentPayment {
  id: string
  date: string
  amount: number
  status: "completed" | "pending" | "failed"
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, SideBarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent  {
  /*
  userRole: string |null = null;
  user: User|null = null;
  users: User[] = [];
  headers: string[] = ['ID', 'Usuario', 'Correo', 'Rol'];
  loans:Loans[] =[];
  constructor(private auth: AuthService, private router: Router,
              private usersService: UserService,
              public spinner:SpinnerService,
              private loanService:LoansService,
              private organizaionService:OrganizationsService
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
      }else if(this.userRole === 'Client'){
        this.loadLoansByOrganization();
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
  loadLoansByOrganization(): void {
    this.organizaionService.getOrganizationByOwner(this.auth.getUserId()).subscribe({
      next: (organization) => {
        this.loanService.getLoansByOrganizationId(organization[0].organization_id).subscribe({
          next: (loans) => {
            this.loans = loans;
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
    */
    
    loanSummary = signal<LoanSummary>({
    totalLoans: 5,
    activeLoans: 3,
    pendingApproval: 1,
    totalAmount: 25000,
    paidAmount: 8500,
  })

  recentPayments = signal<RecentPayment[]>([
    { id: "PAY-001", date: "2023-05-15", amount: 500, status: "completed" },
    { id: "PAY-002", date: "2023-05-01", amount: 500, status: "completed" },
    { id: "PAY-003", date: "2023-04-15", amount: 500, status: "completed" },
  ])
}
