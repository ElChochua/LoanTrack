import { LoansModel } from "../Loans/LoansModel";
import { OrganizationsModel } from "../Organizations/Organizations";
import { User } from "../Users/UserModel";

export interface TransactionsModel{
    transaction_id: number;
    loan: LoansModel;
    user: User;
    organization: OrganizationsModel;
    transaction_type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
    amount: number;
    issued_at: string; // ISO date string
    transaction_description: string;
}