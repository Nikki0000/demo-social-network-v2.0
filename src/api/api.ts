import axios from "axios"
import { ProfileType, UsersType } from "../types/types";



export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "594301d4-5e10-4b5a-b5ad-6549ff84c6b9"
    }
});


export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}



