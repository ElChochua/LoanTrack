import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Loans } from '../../../../models/Loans/LoansModel';


@Component({
  selector: 'app-loan-details-modal',
  standalone: true,
  templateUrl: './loan-modal.component.html'
})
export class LoanDetailsModalComponent {
  @Input() loan: Loans = {} as Loans;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}