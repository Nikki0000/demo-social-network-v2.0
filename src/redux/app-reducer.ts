import { type } from "os";
import { getAuthUserData } from "./auth-reducer";
import { InferActionsType } from "./redux-store";



let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState;

export type ActionsType = InferActionsType<typeof actions>

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}


export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });

}