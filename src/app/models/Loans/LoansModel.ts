export interface Loans{
    loan_id: number;
    organization_id: number;
    loan_applicant_id: number;
    amount: number;
    interest_rate: number;
    term_value: number;
    term_unit: string;
    status: string;
    issued_at: string;
    due_at: string;
    approved_at?: string;
    purpose: string;
    currency: string;
    total_amount_due: number;
}
export interface LoanApply{
    organization_id: number;
    loan_applicant_id: number;
    amount: number;
    interest_rate: number;
    term_value: number;
    term_unit: string;
    purpose: string;
    currency: string;
}