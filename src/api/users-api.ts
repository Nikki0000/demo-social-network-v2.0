import { AxiosPromise } from "axios";
import { GetItemsType, APIResponseType, instance } from "./api";



export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data;
        });
    },
    follow(userid: number) {
        return instance.post<APIResponseType>(`follow/${userid}`).then(res => res.data)
    },
    unfollow(userid: number) {
        return instance.delete(`follow/${userid}`).then(res => res.data) as Promise<APIResponseType>
    }
        
}