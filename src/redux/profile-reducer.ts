import { act } from "react-dom/test-utils";
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { usersAPI } from "../api/users-api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsType } from "./redux-store";





let initialState = {
            
    postsData: [
        {id: 1, message: 'Example first post', count:12}, 
        {id: 2, message: 'Example second post', count:44},
        {id: 2, message: 'Example third post', count:34}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
};



const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch(action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                count: 12
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default: 
            return state;
            
            
    }

}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status: status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos: photos} as const)

}




export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if(data.resultCode  === 0){
        dispatch(actions.setStatus(status));
    }   
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if(data.resultCode  === 0){
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }   
}


export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if(data.resultCode  === 0){
        if(userId != null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error ("userId can`t be null")
        }
    } else {
        let error = data.messages[0];
        let errorObj: any = {'_error': error};
        let match =  error.match(/Invalid url format \(Contacts->(.+)\)/);
        if (match) {
            let fieldName = match[1].toLowerCase()
            errorObj = { 'contacts': {}}
            errorObj.contacts[fieldName] = error
        }
        //dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        //return Promise.reject(response.data.messages[0]);
        dispatch(stopSubmit("edit-profile", errorObj))  
        throw error;
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>