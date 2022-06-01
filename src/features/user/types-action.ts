import IUser from "../../db/types/user.type";
export interface UserState {
    value: IUser | null;
    status: 'idle' | 'loading' | 'failed';
}

export interface LoginPayload{
    tenDangNhap:string;
    matKhau:string;
}