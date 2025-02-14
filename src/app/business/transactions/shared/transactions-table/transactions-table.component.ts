import { Component } from "@angular/core";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { LoansService } from "../../../../core/services/loans/loans.service";
import { OrganizationsService } from "../../../../core/services/organizations-service/organizations.service";
import { TransactionsService } from "../../../../core/services/transactions/transactions.service";
import { Transactions } from "../../../../models/Transactions/TransactionsModel";
@Component({
    selector: "app-transactions-table",
    standalone: true,
    templateUrl: "./transactions-table.component.html",
    imports: [],
})
export class TransactionsTable{
    transactions: Transactions[] = [];
    constructor(private authService:AuthService,
        private loanService:LoansService,
        private organizationsService: OrganizationsService,
        private transactionsService:TransactionsService
    ){}
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
        }if(this.authService.getRole() == 'Client'){
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
}