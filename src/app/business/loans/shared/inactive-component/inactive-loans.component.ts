import { Component, Input } from "@angular/core";
import { ComponentFixtureNoNgZone } from "@angular/core/testing";
import { Loans } from "../../../../models/Loans/LoansModel";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { OrganizationsService } from "../../../../core/services/organizations-service/organizations.service";
import { LoansService } from "../../../../core/services/loans/loans.service";

@Component({
  selector: "app-inactive-loans",
  standalone: true,
  imports: [],
  templateUrl: "./inactive-loans.component.html",
})
export default class InactiveLoansComponent{
    constructor(private authService:AuthService, private loansService: LoansService){}
    loans:Loans[] = [];
    user_role:string|null = null;
    organizations:any[] = [];
    ngOnInit():void{
        this.user_role = this.authService.getRole();
        this.loadForRole();
    }
    loadForRole():void{
        if(this.user_role === 'SUPER_ADMIN'){

        }else if(this.user_role === 'Client'){
        }else if(this.user_role === 'User'){
            this.loansService.getAllInactiveLoansByMember().subscribe({
                next: (loans) => {
                    this.loans = loans;
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }
}