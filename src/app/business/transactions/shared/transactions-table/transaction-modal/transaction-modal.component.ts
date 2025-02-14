import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Transaction } from "../../../../../models/Loans/LoansModel";
import { Transactions } from "../../../../../models/Transactions/TransactionsModel";
@Component({
    selector: "app-transaction-modal",
    standalone: true,
    templateUrl: "./transaction-modal.component.html",
    imports: [],
})
export  class TransactionModalComponent {
    @Input() transaction: Transactions = {} as Transactions;
    @Output() closeModal = new EventEmitter<void>();

    onClose():void{
        this.closeModal.emit();
    }
}