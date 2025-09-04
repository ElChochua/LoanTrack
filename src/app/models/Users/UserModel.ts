export interface UserCreds{
    email: string;
    password: string;

}
export interface UserDetails{
    user_details_id?: number,
    user?:User,
    email?: string
    name?: string
    last_name?: string
    birthdate?: string
    curp?:string
    status?: string
    created_at?: string
    phone_number?: string
}  
export interface User{
    Id: number;
    user: string;
    email: string;
    role:string | null;
}
