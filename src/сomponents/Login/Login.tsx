import React, { FC } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { CheckBoxForm, createField, GetStringKeys, InputForm } from "../common/FormControl/FormsControls";
import { login } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom";
import style from "../common/FormControl/FormsControls.module.css"
import { AppStateType } from "../../redux/redux-store";
import { Button } from "antd";


type LoginFormOwnProps = {
    captchaUrl: string | null
}



const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = 
                    ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                <div className={style.userNameText}>Username: {createField<LoginFormValuesTypeKeys>("Email", "email", InputForm, [required])}</div>
                <div className={style.passwordText}>Password: {createField<LoginFormValuesTypeKeys>("Password", "password", InputForm, [required], {type: "password"})}</div>
                <div className={style.rememberMeText}>Remember me{createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", CheckBoxForm, [], {type: "checkbox"})}</div>

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", InputForm, [required], {} )}

                { error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
                }
                <div className={style.buttonLogin1}>
                    <button className={style.buttonLogin}>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)



export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>



export const Login: FC = () => {

    const captchaUrl = useSelector( (state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector( (state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch<any>(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }

    if(isAuth) {
        return <Navigate to={'/profile'} />
    }

    return(
        <div>
            <h1 className={style.loginHead}>Login</h1>
            <div className={style.loginForm}>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
            </div>
            
        </div>
    )
}
