export interface UserCreds{
    email: string;
    password: string;
}
export interface User{
    email: string;
    role:string |null;
}
export interface UserRegister{
    email: string;
    username: string;
    password: string;
}