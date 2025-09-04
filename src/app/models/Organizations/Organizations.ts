import { User } from "../Users/UserModel";

export interface OrganizationsModel{
    id?:number,
    owner?:User,
    organization_name?:string,
    description?:string,
    invitation_code?:string,
    status?: "ACTIVE" | "INACTIVE",
    cicles:Array<Cicles>,
    actualCicle?:Cicles
    members:Array<OrganizationsMember>
}
export interface Cicles{
    cicle_id?: number;
    beggining_date?: Date;
    end_date?: Date;
    description?: string;
    interest_rate?: number;
    minimum_aportation?: number;
    created_at?: Date;
    organization?: OrganizationsModel;
    current_balance?: number;
    total_aportations?: number;
    status?: "OPEN" | "CLOSED";
}
export interface OrganizationsMember{
    organization_member_id?: number;
    organization?: OrganizationsModel;
    user?: User;
    role?: string;
    status?: "ACTIVE" | "INACTIVE";
    joined_at?: Date;
}