import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, InputForm, TextArea } from "../../common/FormControl/FormsControls";
import s from './ProfileInfo.module.css'
import style from "../../common/FormControl/FormsControls.module.css"
import { ProfileType } from "../../../types/types";

type PropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfieleDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={s.userDataBlock}>
        <div>
            <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", InputForm, [])} 
        </div>
        <div>
            <b>Looking for a job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", InputForm, [], {type: "checkbox"})} 
        </div>
        <div>
            <b>My professional skills</b>: {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", TextArea, [])} 
        </div>
        <div>
            <b>About me</b>:  {createField<ProfileTypeKeys>("About me", "aboutMe", TextArea, [])}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, "contacts." + key, InputForm, [])} </b> 
                </div>
            }) } 
        </div>
        <div><button>Save</button></div>
            { error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
                }
        </div>
        </form>
    )
}

//const ProfieleDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfieleDataForm)

const ProfieleDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfieleDataForm)

export default ProfieleDataFormReduxForm;