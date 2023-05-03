import { InferActionsType } from "./redux-store";

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    
    messagesData: [
        {id: 1, message: 'Hi'}, 
        {id: 2, message: 'How is your'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessageType>,
    
    dialogsData: [
        {id: 1, name: 'Nikita'}, 
        {id: 2, name: 'Stas'},
        {id: 3, name: 'Gena'},
        {id: 4, name: 'Turbo'},
        {id: 5, name: 'Dusha'}
    ] as Array<DialogType>
};


const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/dialogs/SEND_MESSAGE': //Если тип acion = SEND_MESSAGE
            let body = action.newMessageBody; //Присваиваем значение переменной сообщения
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}]//Пушим в стейт новое сообщение
            };
        default: 
            return state;
    }
}


export const actions = {
    sendMessage: (newMessageBody: string) => ({type : 'SN/dialogs/SEND_MESSAGE', newMessageBody} as const)
}


export default dialogsReducer;

export type InitialStateType = typeof initialState

type ActionsType = InferActionsType<typeof actions>