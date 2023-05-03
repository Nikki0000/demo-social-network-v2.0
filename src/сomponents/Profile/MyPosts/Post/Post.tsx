import React, {FC} from "react";
import s from './Post.module.css'
import { PostType } from "../../../../types/types";

type PropsType = {
    message: string
    count: number
    className: any
}

const Post: FC<PropsType> = (props) => {
    return (
        <div className={s.postBorder}>
        <div className={s.item}>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25386.png' />
            <div className={s.postText}>
                {props.message}
            </div>
        </div>
        <div>
                <span>like</span> {props.count}
            </div>
        </div>
        
    )
}



export default Post;