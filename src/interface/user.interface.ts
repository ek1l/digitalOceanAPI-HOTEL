import { Response } from "express";

export interface ICreateUser {
    username: string;
    password: string;
    email: string;
}

export type TLogin = Pick<ICreateUser, 'email' | 'password'>

export interface IUser extends ICreateUser {
    id: number;
    role: string;
}

export interface ILogin {
    user: string;
    token: string;
    role: string;
}
export type TLoginResult = ILogin | { error: string } | Response<any, Record<string, any>>

export interface ITokenPayload {
    id: number;
    iat: number; 
    exp: number;
}

export interface IValidateToken {
    valid: boolean;
    role: any;
}