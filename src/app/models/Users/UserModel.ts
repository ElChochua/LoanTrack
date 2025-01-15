export interface UserCreds{
    email: string;
    password: string;
}
export interface UserDetails{
    user_id: number;
    user_name: string;
    name?: string;
    last_name?: string;
    birthdate?: string;
    curp?:string;
    email: string;
    status: string;
    role:string |null;
    created_at: string;
    phone_number?: string;

}
export interface User{
    user_id: number;
    user: string;
    email: string;
    role:string |null;
}
export interface UserRegister{
    email: string;
    username: string;
    password: string;
}