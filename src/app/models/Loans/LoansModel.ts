import { Cicles, OrganizationsModel } from "../Organizations/Organizations"
import { User } from "../Users/UserModel"

export interface LoansModel{
    loan_id?:number
    organization?:OrganizationsModel
    user?:User
    cicle?: Cicles // Replace 'any' with the actual CiclesModel type when available
    purpose?: string
    amount?: number
    interest_rate?: number
    start_date?: Date
    end_date?: Date
    created_at?: Date
    status?: "ACTIVE" | "CLOSED" | "DEFAULTED" | "APPROVED" | "REJECTED" | "INACTIVE"
}
export interface Credits{
    credit_id?: number
    user?: User
    organization?: OrganizationsModel
    cicle?: Cicles
    total_aportations?: number
    available_credit?: number
    updated_at?: Date
}