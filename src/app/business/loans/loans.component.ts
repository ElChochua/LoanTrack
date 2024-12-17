import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrganizationsService } from '../../core/services/organizations-service/organizations.service';
import { UserService } from '../../core/services/User/user.service';
import { OrganizationsDetailsTableComponent } from '../organizations/shared/organization-details-table/organizations-details-table/organizations-details-table.component';
import { OrganizationDetailsModel } from '../../models/Organizations/OrganizationModel';
import { LoanApply, Loans } from '../../models/Loans/LoansModel';
import { LoansService } from '../../core/services/loans/loans.service';
import { LoanDetailsModalComponent } from './shared/loan-info-modal/loan-modal.component';
import { LoanDetailsFormModalComponent } from "./shared/request-loan-modal/request-modal.component";
import { ToastService } from '../../core/services/toast.service';
@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [LoanDetailsModalComponent, LoanDetailsFormModalComponent],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export default class LoansComponent implements OnInit {
  user_role: string|null = null;
  organizations: OrganizationDetailsModel[] = [];
  loans:Loans[] = [];
  modalIsOpen: boolean = false;
  requestModalIsOpen: boolean = false;
  constructor(private authService:AuthService, private organzizationService:OrganizationsService,private loanService:LoansService, 
    private userService:UserService, private toastService:ToastService) {

    }
  ngOnInit(): void {
    this.user_role = this.authService.getRole();
    this.loadForRole();
  }
  loadForRole():void{
    if(this.user_role === 'SUPER_ADMIN'){
      this.loanService.getAllLoans().subscribe({
        next: (loans) => {
          this.loans = loans;
        },
        error: (err) => {
          console.error(err);
        }
      });
      this.organzizationService.getAllOrganizations().subscribe({
        next: (organizations) => {
          this.organizations = organizations;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }else if(this.user_role === 'Client'){
      this.organzizationService.getAllOrganizationsByOwner(this.authService.getUserId()).subscribe({
        next: (organizations) => {
          this.organizations = organizations;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }else if(this.user_role === 'User'){
      this.organzizationService.getAllOrganizationsByMember(this.authService.getUserId()).subscribe({
        next: (organizations) => {
          this.organizations = organizations;
        },
        error: (err) => {
          console.error(err);
        }
      });
      this.loanService.getLoansByApplicantId(this.authService.getUserId()).subscribe({
        next: (loans) => {
          this.loans = loans;
        }
      });
    }
  }
  approveLoan(loan_id:number):void{
    this.loanService.approveLoan(loan_id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  loanApply(loan:Loans):void{
   this.loanService.loanApply(loan).subscribe({
      next: (response) => {
        this.toastService.success('Loan request sent successfully');
      },
      error: (err) => {
        this.toastService.error('Loan request failed' + err);
      }
   });
  }
  getOrganizationNameById(organization_id:number):string{
    let organization = this.organizations.find(organization => organization.organization_id === organization_id);
    return organization ? organization.organization_name : '';
  }
  rejectLoan(loan_id:number):void{
    this.loanService.rejectLoan(loan_id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  openModal():void{
    this.modalIsOpen = true;
  }
  closeModal():void{
    this.modalIsOpen = false;
  }
  openRequestModal():void{
    this.requestModalIsOpen = true;
  }
  closeRequestModal():void{
    this.requestModalIsOpen = false;
  }
}
