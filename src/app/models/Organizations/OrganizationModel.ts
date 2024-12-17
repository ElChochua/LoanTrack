export interface OrganizationModel{
    organization_id?: number
    organization_name: string
    owner_id: number
    description: string
}
export interface OrganizationDetailsModel{
    organization_id: number
    organization_name: string
    owner_id: number
    description: string
    total_members: number
    total_transactions: number
    created_at: string
    status: string
}
export interface OrganizationRegisterModel{
    organization_name: string
    description: string
    owner_id: number
}
export interface OrganizationMembers{
    organization_ID: number
    user_ID: number
    role: string
}