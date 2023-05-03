import axios from "axios";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/user.png'
import Paginator from "../common/Paginator/Paginator";
import styles from './users.module.css';
import { UsersType } from "../../types/types";


type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    unfollow: (userid: number) => void
    follow: (userid: number) => void
}


const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {


    return (
        <div className={styles.userBlock}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    { user.followed ? 
                        <button disabled={followingInProgress.
                            some(id => id === user.id)} 
                                onClick={ () => {unfollow(user.id)}}>
                                    Unfollow</button> 
                            : <button disabled={followingInProgress.some(id => id === user.id)} 
                                onClick={ () => {follow(user.id)}}>
                                Follow</button>}
                    
                </div>
            </span>
            <span>
                <span>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.id}
                    </div>
                </span>
            </span>
        </div>)
}

export default User;