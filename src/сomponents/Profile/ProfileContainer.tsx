import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import axios from "axios";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { Navigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

export function withRouter(Children: any) {
    return (props: any) => {
        const router = {params: useParams()};
        return <Children {...props} router={router}/>
    }
}


type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void 
    updateStatus: (status: string) => void 
    savePhoto: (file: File) => void 
    saveProfile: (profile: ProfileType) => Promise<any> 
}

type PathParamsType = {
    userId: string
    router: any
}

type PropsType = MapPropsType & DispatchPropsType & PathParamsType

class ProfileContainer extends React.PureComponent<PropsType> {


    refreshProfile() {
        let userId: number | null = +this.props.router.params.userId;


        if(!userId) {
            userId = this.props.authorizedUserId;
            // if(!userId){
            //     this.props.history.push("/login");
            // }
        }

        if(!userId) {
            console.error("Id should exists")
        } else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if(this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} 
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus} 
                isOwner={!this.props.router.params.userId} 
                savePhoto={this.props.savePhoto}/>
        )
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)(ProfileContainer);









