import { Dispatch } from "redux";
import { usersAPI } from "../api/users-api";
import { PhotosType, UsersType } from "../types/types";
import { AppStateType, BaseThunkType, InferActionsType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { APIResponseType } from "../api/api";



// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';





let initialState = {
    users: [ ] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id`s: number
    filter: {
        term: '',
        friend: null as null | boolean 
    }
};




const usersReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/USERS/FOLLOW': 
            return {
                ...state, 
                users: state.users.map( u =>  {
                    if (u.id === action.userid) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'SN/USERS/UNFOLLOW': 
            return {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userid) {
                        return {...u, followed: false}
                    }
                    return u;
                } )
            }
        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return  {...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_FILTER': {
            return  {...state, filter: action.payload}
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return  {...state, totalUsersCount: action.count}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return  {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {...state, followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userid] 
                : state.followingInProgress.filter(id => id != action.userid)}
        }
        default:
            return state;

    }
}





export const actions = {
    followSuccess: (userid: number) => (
        {type: 'SN/USERS/FOLLOW', userid} as const
    ),
    
    unfollowSuccess: (userid: number) => (
        {type: 'SN/USERS/UNFOLLOW', userid} as const
    ),
    
    setUsers: (users: Array<UsersType>) => (
        {type: 'SN/USERS/SET_USERS', users} as const
    ),
    
    setCurrentPage: (currentPage: number) => (
        {type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const
    
    ),

    setFilter: (filter: FilterType) => (
        {type: 'SN/USERS/SET_FILTER', payload: filter} as const
    
    ),
    
    setTotalUsersCount: (totalUsersCount: number) => (
        {type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const
    ),
    
    toggleIsFetching: (isFetching: boolean) => (
        {type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const
    ),
    
    toggleFollowingProgress: (isFetching: boolean, userid: number) => (
        {type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userid} as const
    )
}







export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
    
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.setCurrentPage(currentPage));
    }
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userid: number, apiMethod: (userid: number) => Promise<APIResponseType>, 
                                    actionCreator: (userid: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userid));

    let data = await apiMethod(userid);
    if(data.resultCode === 0){
        dispatch(actionCreator(userid));
    }

    dispatch(actions.toggleFollowingProgress(false, userid));
}




export const follow = (userid: number): ThunkType => {

    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userid, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}

export const unfollow = (userid: number): ThunkType => {

    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userid, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}


export default usersReduser;

export type InitialStateType = typeof initialState;

export type FilterType = typeof initialState.filter;

type ActionsTypes = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>