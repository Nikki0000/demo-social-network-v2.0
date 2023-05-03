import React, { FC } from "react";
import { ParentComponent } from "./Carousel/parentCarousel";
import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
    savePhoto: (file: File) => void 
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {
    return (
    <div className={s.profileAll}>
        <div className={s.profileInfoBlock}>
            <ProfileInfo profile={props.profile} 
                        status={props.status} 
                        updateStatus={props.updateStatus} 
                        isOwner={props.isOwner} 
                        savePhoto={props.savePhoto} 
                        saveProfile={props.saveProfile}/>
        </div>
        <div className={s.postBlock}>
            <MyPostsContainer />
            {/* <div className={s.carouselBlock}>
                <h2>Photos</h2>
                <ParentComponent/>
            </div> */}
        </div>
        
    </div>
    )
}

export default Profile;