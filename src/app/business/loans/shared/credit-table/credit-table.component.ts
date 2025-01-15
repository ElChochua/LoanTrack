import { Component } from "@angular/core";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { LoansService } from "../../../../core/services/loans/loans.service";
import { UserCredits } from "../../../../models/Loans/LoansModel";

@Component({
    selector: "app-credit-table",
    standalone: true,
    templateUrl: "./credit-table.component.html",
    imports: [],
})
export class CreditTableComponent {
    userCredits: UserCredits[] = [];
    constructor(private authService:AuthService, private loanService:LoansService){

    }
    ngOnInit(): void {
        this.loadcredits();
        console.log(this.userCredits.forEach(credit => {credit.available_credit}));
    }
    loadcredits():void{
        this.loanService.getAllCreditsByUser(this.authService.getUserId()).subscribe({
            next: (credits) => {
                this.userCredits = credits;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}