export interface PaymentDto{
    loan_ID: number;
    user_ID: number;
    transaction_type: string;
    amount: number;
    issued_at: string;
    description: string;
}