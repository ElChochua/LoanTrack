import { Component, Input } from "@angular/core";
import { UserCredits } from "../../../../models/Loans/LoansModel";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { LoansService } from "../../../../core/services/loans/loans.service";
import { OrganizationsService } from "../../../../core/services/organizations-service/organizations.service";
import { OrganizationDetailsModel } from "../../../../models/Organizations/OrganizationModel";
import { map } from "rxjs";

@Component({
    selector: "app-user-credit-table",
    standalone: true,
    templateUrl: "./user-credit-table.component.html",
    imports: [],
})
export class UserCreditsComponent {
    constructor(private authService:AuthService, private loanService:LoansService,private organizationsService:OrganizationsService){}
    user_credits:UserCredits[] = [];
    organizationOwned: number=0;
    ngOnInit(){
        this.getUsersCreditsByRole();
    }
    getUsersCreditsByRole(){
        if(this.authService.getRole() === 'SUPER_ADMIN'){
            console.log('SUPER_ADMIN');
            this.loanService.getAllCredits().subscribe({
                next: (credits) => {
                    this.user_credits = credits;
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }else if(this.authService.getRole() === 'Client'){

            this.organizationsService.getOrganizationByOwner(this.authService.getUserId()).subscribe({
                next: (organiztion) => {
                    this.organizationOwned = organiztion[0].organization_id;
                    this.loanService.getAllCreditsByOrganizaitonId(this.organizationOwned).subscribe({
                        next : (credits) => {
                            this.user_credits = credits;
                        },
                        error: (err) => {
                            console.error(err);
                        }
                    });
                },
                error: (err) => {
                    console.error("errorsini",err);
                }
            });
        }else if(this.authService.getRole() === 'User'){
            
            this.loanService.getAllCreditsByUser(this.authService.getUserId()).subscribe({
                next: (credits) => {
                    this.user_credits = credits;
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }
}