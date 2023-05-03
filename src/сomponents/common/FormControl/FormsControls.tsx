import React, { FC } from "react"
import { Field, WrappedFieldProps } from "redux-form"
import styles from "./FormsControls.module.css"
import { FieldValidatorType } from "../../../utils/validators/validators"
import { WrappedFieldMetaProps } from "redux-form/lib/Field"
import { Checkbox, Input } from 'antd';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    // child: any
    // input: string
    children: any
}



const FormControl: React.FC<FormControlPropsType> = ({meta:{touched, error}, children}) => {
    const hasError = touched && error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            { hasError && <span> {error} </span>}
        </div>
    )
}



export const TextArea: FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <Input {...input} {...restProps} />
        </FormControl>
    )
}

export const InputForm: FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><Input {...input} {...restProps} /></FormControl>
    )
}

export const CheckBoxForm: FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}><Checkbox {...input} {...restProps} /></FormControl>
    )
}



export function createField<FormKeysType extends string>(placeholder: string | undefined, 
                            name: FormKeysType, 
                            component: FC<WrappedFieldProps>, 
                            validate: Array<FieldValidatorType>, 
                            props = {}, 
                            text = "") {
    return <div>
        <Field placeholder={placeholder} name={name} component={component} validate={validate} {...props} /> {text}
    </div>
}


export type GetStringKeys<T> = Extract<keyof T, string>