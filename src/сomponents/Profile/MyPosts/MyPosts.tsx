import React, { FC } from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
//import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { GetStringKeys, TextArea, createField } from "../../common/FormControl/FormsControls";
import { PostType } from "../../../types/types";


type PropsType = {

}

export type AddPostFormValuesType = {
    newPostText: string
}


type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Post message", "newPostText", TextArea, [required, maxLength10])}
            </div>
            <div>
                <button>AddPost</button>
            </div>
        </form>
    )
}


let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)



export type MapPropsType = {
    postsData: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void    
}

const MyPosts: FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElement = props.postsData.map( p => <Post className={s.postElement} key={p.id} message={p.message} count={p.count} />);

    let newPostElement = React.createRef();

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }


    return <div className={s.postsBlock}>
        <h3>My Posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost}/>
        <div className={s.posts}>
            {postsElement}
        </div>
    </div>
}





export default MyPosts;