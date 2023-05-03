import React, { FC } from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";


const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FormType = {
    term: string
    friend: any //"true" | "false" | "null"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<PropsType> = React.memo((props) => {

    

    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmiting: boolean) => void} ) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter);
        setSubmitting(false);    
    }


    return (
        <div>
    <Formik
       initialValues={{ term: '', friend: 'null'}}
       validate={usersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Followed</option>
                <option value="false">Undollowed</option>
           </Field>
           <button type="submit" disabled={isSubmitting}>
             Search
           </button>
         </Form>
       )}
     </Formik>
        </div>
    )
})