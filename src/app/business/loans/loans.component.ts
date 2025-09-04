import { AuthService } from '../../core/services/auth/auth.service';
import { OrganizationsService } from '../../core/services/organizations-service/organizations.service';
import { UserService } from '../../core/services/User/user.service';
import { ToastService } from '../../core/services/toast.service';
import { LoansModel } from '../../models/Loans/LoansModel';
import {MatIconModule} from '@angular/material/icon';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { OrganizationsModel } from '../../models/Organizations/Organizations';
import { Component, OnInit, computed, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LoansService } from '../../core/services/loans/loans.service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    TableModule,
    ButtonModule,
    TagModule,
    TableModule, 
    TagModule, 
    IconFieldModule, 
    InputTextModule, 
    InputIconModule, 
    MultiSelectModule,
    CommonModule,InputTextModule],
  templateUrl: './loans.component.html',
})
export default class LoansComponent implements OnInit {
  /*
  user_role: string|null = null;
  organizations: OrganizationsModel[] = [];
  loans:LoansModel[] = [];
  cosa: LoansModel = {} as LoansModel;
  selectedId: number = 0;
  organization_id?: number = 0;
  modalIsOpen: boolean = false;
  payModalIsOpen: boolean = false;
  requestModalIsOpen: boolean = false;
  */
  constructor(private authService:AuthService, private organzizationService:OrganizationsService,private loanService:LoansService, 
    private userService:UserService, private toastService:ToastService) {

    }
  loans = [
    {
      id: "PR-001",
      organization: "Cooperativa Familiar",
      amount: 15000,
      paid: 8500,
      remaining: 6500,
      nextPayment: "2024-01-15",
      nextAmount: 875,
      status: "active",
      progress: 57,
      daysOverdue: 0,
    },
    {
      id: "PR-002",
      organization: "Amigos Emprendedores",
      amount: 25000,
      paid: 12000,
      remaining: 13000,
      nextPayment: "2024-01-10",
      nextAmount: 1250,
      status: "overdue",
      progress: 48,
      daysOverdue: 5,
    },
    {
      id: "PR-003",
      organization: "Grupo Solidario",
      amount: 8000,
      paid: 6400,
      remaining: 1600,
      nextPayment: "2024-01-20",
      nextAmount: 400,
      status: "active",
      progress: 80,
      daysOverdue: 0,
    },
    {
      id: "PR-004",
      organization: "Red de Apoyo",
      amount: 12000,
      paid: 3000,
      remaining: 9000,
      nextPayment: "2024-01-08",
      nextAmount: 600,
      status: "overdue",
      progress: 25,
      daysOverdue: 12,
    },
    {
      id: "PR-005",
      organization: "Círculo de Confianza",
      amount: 20000,
      paid: 15000,
      remaining: 5000,
      nextPayment: "2024-01-25",
      nextAmount: 1000,
      status: "active",
      progress: 75,
      daysOverdue: 0,
    },
  ]

  // Datos para las métricas
  metrics = {
    totalActive: 3,
    totalOverdue: 2,
    totalAmount: 80000,
    totalPaid: 44900,
    nextPaymentAmount: 4125,
    nextPaymentDate: "2024-01-08",
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case "active":
        return "success"
      case "overdue":
        return "danger"
      default:
        return "info"
    }
  }

  getStatusLabel(status: string) {
    switch (status) {
      case "active":
        return "Activo"
      case "overdue":
        return "En Mora"
      default:
        return "Pendiente"
    }
  }
  ngOnInit(): void {
    /*
    this.user_role = this.authService.getRole();
    this.loadForRole();
    console.log(this.modalIsOpen);
    */
  }
  loadForRole():void{
    /*
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
          this.organization_id = this.organizations[0].id;
          this.loanService.getLoansByOrganizationId(this.organization_id).subscribe({
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
    }else if(this.user_role === 'User'){
      this.organzizationService.getAllOrganizationsByOwner(this.authService.getUserId()).subscribe({
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
      */
  }
  approveLoan(loan_id:number):void{
    /*
    this.loanService.approveLoan(loan_id).subscribe({
      next: (response) => {
        this.toastService.success('Se ha aprobado el préstamo');
        window.location.reload();
      },
      error: (err) => {
        this.toastService.error('No se ha podido aprobar el préstamo' + err);
      }
    });
    */
  }
/*
  loanApply(loan:LoansModel):void{
   this.loanService.loanApply(loan).subscribe({
      next: (response) => {
        this.toastService.success('Se ha solicitado el préstamo con exito');
        console.log(response);
      },
      error: (err) => {
        this.toastService.error('No se ha podido solicitar el préstamo' + err);
        console.log(err);
      }
   });
  }
  rejectLoan(loan_id:number):void{
    console.log(loan_id);
    this.loanService.rejectLoan(loan_id).subscribe({
      next: (response) => {
        this.toastService.success('Se ha rechazado el préstamo');
        window.location.reload();
      },
      error: (err) => {
        this.toastService.error('No se ha podido rechazar el préstamo' + err);
      }
    });
  }
  openModal(loan: LoansModel):void{
    this.cosa = loan;
    this.modalIsOpen = true;
    console.log(this.modalIsOpen);
  }
  closePayModal():void{
    this.payModalIsOpen = false;
  }
  openPayModal(selected:number):void{
    this.selectedId = selected;
    this.payModalIsOpen = true;
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
    */
}
