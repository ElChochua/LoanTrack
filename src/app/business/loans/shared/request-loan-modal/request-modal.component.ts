import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizationDetailsModel } from '../../../../models/Organizations/OrganizationModel';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { OrganizationsService } from '../../../../core/services/organizations-service/organizations.service';
import { LoanApply, Loans } from '../../../../models/Loans/LoansModel';



@Component({
  selector: 'app-request-loan-modal',
  standalone: true,
  templateUrl: './request-modal.component.html',
  imports: [ReactiveFormsModule],
})
export class LoanDetailsFormModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitLoanDetails = new EventEmitter<Loans>();
  @Input() organizations: OrganizationDetailsModel[] = [];

  loanForm: FormGroup;
  currencies = ['USD', 'EUR', 'GBP', 'MXN'];
  constructor(private fb: FormBuilder, private authService: AuthService, private organizationService: OrganizationsService) {
    this.loanForm = this.fb.group({
      organization_id: ['', Validators.required],
      loan_applicant_id: this.authService.getUserId(),
      amount: ['', [Validators.required, Validators.min(0)]],
      interest_rate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      term_value: ['', [Validators.required, Validators.min(1)]],
      term_unit: ['month', Validators.required],
      purpose: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.submitLoanDetails.emit(this.loanForm.value);
      console.log(this.loanForm.value);
      this.onClose();
    }
  }
}