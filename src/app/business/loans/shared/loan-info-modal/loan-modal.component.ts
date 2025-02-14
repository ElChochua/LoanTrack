import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Loans } from '../../../../models/Loans/LoansModel';
import LoansComponent from '../../loans.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoansService } from '../../../../core/services/loans/loans.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loan-details-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loan-modal.component.html'
})
export class LoanDetailsModalComponent {
  editMode: boolean = false;
  loanForm: FormGroup;
  @Input() userRole: string|null = null;
  @Input() loan: Loans = {} as Loans;
  @Output() closeModal = new EventEmitter<void>();
  constructor(private authService:AuthService, private loanService:LoansService, private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      amount: ['', Validators.required],
      interest_rate: ['', Validators.required],
      term_value: ['', Validators.required],
      term_unit: ['', Validators.required],
    });
   }

  onClose():void{
    this.closeModal.emit();
  }
  toggleEditMode():void{
    this.editMode = !this.editMode;
    if(this.editMode){
      this.loanForm.patchValue(this.loan);
    }
  }
  onSubmit():void{
    const updatedLoan: Loans = { ...this.loan, ...this.loanForm.value };
    this.loanService.updateLoan(updatedLoan).subscribe({
      next: (response) =>{
        if(response.code === 200){
          this.closeModal.emit();
          window.location.reload();
        }
      },
    });
  }
}