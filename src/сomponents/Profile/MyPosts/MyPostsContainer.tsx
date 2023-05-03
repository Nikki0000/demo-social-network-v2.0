import React from "react";
import { connect } from "react-redux";
import { actions } from "../../../redux/profile-reducer";
import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts";
import { AppStateType } from "../../../redux/redux-store";



const mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}



const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);


export default MyPostsContainer;