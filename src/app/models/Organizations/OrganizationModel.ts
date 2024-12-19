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
    organization_id: number
    user_id: number
    name:string
    email:string
    status:string
    role: string
}
export interface AddUserToOrganizationMemberDto{
    user_id:number
    organization_id:number
    role?:string
}