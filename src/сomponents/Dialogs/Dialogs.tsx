import React, { FC } from "react";
import s from './Dialogs.module.css'
import { Navigate, NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { createField, TextArea } from "../common/FormControl/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { InitialStateType } from "../../redux/dialogs-reducer";
import { LoginFormValuesType, LoginFormValuesTypeKeys } from "../Login/Login";


type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}




const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;


    let dialogsElement = state.dialogsData
        .map( dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/> ); 
        

    let messageElement = state.
    messagesData
        .map( message => <Message message={message.message} key={message.id} />)


    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

        
    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
                {dialogsElement}
           </div>
           <div className={s.messages}>
                <div>{messageElement}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
           </div>
        </div>
    )
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

export type NewMessageValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>
type PropsType2 = {

}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, PropsType2> & PropsType2> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {createField<NewMessageValuesTypeKeys>("Enter your message", 'newMessageBody', TextArea, [required, maxLength50])}
                {/* <Field component={TextArea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message"/> */}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;