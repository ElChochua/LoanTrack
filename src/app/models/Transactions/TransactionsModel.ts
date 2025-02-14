export interface Transactions{
    transaction_ID: number;
    loan_ID: number;
    user_ID: string;
    amount: number;
    transaction_type: string;
    issued_at: string;
    transaction_description: string;
}