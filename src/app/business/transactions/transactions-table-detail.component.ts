import { Component } from "@angular/core";
import { AuthService } from "../../core/services/auth/auth.service";
import { TransactionsService } from "../../core/services/transactions/transactions.service";
import { OrganizationsService } from "../../core/services/organizations-service/organizations.service";
import { Transactions } from "../../models/Transactions/TransactionsModel";
import { TransactionModalComponent } from "./shared/transactions-table/transaction-modal/transaction-modal.component";
@Component({
    selector: "app-transactions-detail-table",
    standalone: true,
    templateUrl: "./transactions-table.component.html",
    imports: [TransactionModalComponent],
})
export default class TransactionsDetailTable{
    public detailsModalIsOpen:boolean  = false;
    transactions: Transactions[] = [];
    transaction: Transactions = {} as Transactions;
    constructor(private authService:AuthService, 
        private transactionsService:TransactionsService,
        private organizationsService: OrganizationsService){}
    ngOnInit(){
        this.chargeTransactionsByRole();
    }
    chargeTransactionsByRole(){
        if(this.authService.getRole() === 'SUPER_ADMIN'){
            this.transactionsService.getAllTransactions().subscribe({
                next: (transactions) => {
                    this.transactions = transactions;
                },
                error: (err) => {
                    console.error(err);
                }
            });
    }else if(this.authService.getRole() === 'Client'){
        this.organizationsService.getOrganizationByOwner(this.authService.getUserId()).subscribe({
            next: (organiztion) => {
                this.transactionsService.getAllTransactionsByOrganizationId(organiztion[0].organization_id).subscribe({
                    next : (transactions) => {
                        this.transactions = transactions;
                    },
                    error: (err) => {
                    }
                });
            },
            error: (err) => {
                console.error("errorsini",err);
            }
        });
    }else if(this.authService.getRole() === 'User'){
        this.transactionsService.getAllTransactionsByUserId(this.authService.getUserId()).subscribe({
            next: (transactions) => {
                this.transactions = transactions;
            },
            error: (err) => {
                console.error(err);
            }
        });

    }
}
openDetailsModal(transaction:Transactions):void{
    this.detailsModalIsOpen = true;
    this.transaction = transaction;
}
closeDetailsModal():void{
    this.detailsModalIsOpen = false;
    this.transaction = {} as Transactions;
}
}