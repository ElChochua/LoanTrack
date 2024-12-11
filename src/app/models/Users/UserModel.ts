export interface UserCreds{
    email: string;
    password: string;
}
export interface UserDetails{
    user_id: number;
    user: string;
    email: string;
    status: string;
    role:string |null;
    created_at: string;
}
export interface User{
    user_id: number;
    user: string;
    email: string;
    role:string |null;
}
export interface UserRegister{
    email: string;
    user: string;
    password: string;
}