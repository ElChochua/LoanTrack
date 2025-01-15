import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from "../../../../core/services/auth/auth.service";
import { LoansService } from "../../../../core/services/loans/loans.service";
import { Loans } from "../../../../models/Loans/LoansModel";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentDto } from '../../../../models/loan_payment/Payment';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: "app-pay-modal",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./pay-modal.component.html",
})
export class PayModalClass implements OnInit {
    @Input() loan_id: number = 0;
    @Output() onClose = new EventEmitter<void>();
    user_role:string|null = "";
        showModal = false;
        selectedLoanId: number | null = null;
        paymentForm: FormGroup;
      
        constructor(private fb: FormBuilder, private authService: AuthService, private loansService: LoansService, private toastService:ToastrService) {
          this.paymentForm = this.fb.group({
            amount: ['', [Validators.required, Validators.min(0)]],
            transactionType: ['', Validators.required],
            description: ['', Validators.required]
          });
        }
        ngOnInit(): void {
            this.user_role = this.authService.getRole();
        }
        closeModal(): void {
            this.onClose.emit();
        }
      
        async submitPayment(){
          if (this.paymentForm.valid) {
            const payment: PaymentDto = {
              loan_ID: this.loan_id,
              user_ID: this.authService.getUserId(),
              amount: this.paymentForm.get('amount')?.value,
              transaction_type: this.paymentForm.get('transactionType')?.value,
              issued_at: new Date().toString(),
              description: this.paymentForm.get('description')?.value
            };
            this.loansService.makePayment(payment).subscribe({
                next: (response) => {
                    this.toastService.success('Payment successful', 'Successful payment', {
                        closeButton: true,
                        timeOut: 3000,
                        progressBar: true,
                        progressAnimation: 'decreasing',
                        positionClass: 'toast-bottom-right'
                    });
                    console.log(response);
                },
                error: (err) => {
                    this.toastService.error('Payment failed', 'Failed payment')
                    console.error(err);
                }
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.reload();
            this.closeModal();
          }
        }
}