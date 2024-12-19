import { Component, Input, Output } from "@angular/core";
import { Loans } from "../../../../models/Loans/LoansModel";

@Component({
  selector: "app-loans-table",
  standalone: true,
  templateUrl: "./loan-table.component.html",
  imports: [],
})
export class LoansTableComponent {
    @Input() loans: Loans[] = [];
}