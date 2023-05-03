import axios from "axios";
import React, { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/users-api";
import userPhoto from '../../assets/images/user.png'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from './users.module.css';
import { UsersType } from "../../types/types";
import { Formik, Form, Field } from "formik";
import { UsersSearchForm } from "./UsersSearchForm";
import { FilterType, getUsers } from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPageSelector, getFollowingInProgressSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersFilter, getUsersSelector } from "../../redux/users-selectors";

type PropsType = {
    //pageSize: number
    //currentPage: number,
    //onPageChanged: (pageNumber: number) => void
    //onFilterChanged: (filter: FilterType) => void
    //users: Array<UsersType>
    //followingInProgress: Array<number>
    //unfollow: (userid: number) => void
    //follow: (userid: number) => void
}

export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgressSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch<any>(getUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch<any>(getUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch<any>(getUsers(1, pageSize, filter))
    }
    
    const follow = (userid: number) => {
        dispatch<any>(follow(userid));
    }

    const unfollow = (userid: number) => {
        dispatch<any>(unfollow(userid));
    }

    return <div>

    <UsersSearchForm onFilterChanged={onFilterChanged}/>


    <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    <div>
    {
        users.map( u => <User user={u} key={u.id} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow}/>
        )}
    </div>
    </div>
}



