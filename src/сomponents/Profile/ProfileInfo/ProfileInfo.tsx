import React, { ChangeEvent, FC, useState } from "react";
import Preloader from "../../common/preloader/Preloader";
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import ProfieleDataForm from "./ProfileDataForm";
import { ContactsType, ProfileType } from "../../../types/types";
import Title from "antd/es/typography/Title";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';



type PropsType = {
    profile: ProfileType | null
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
    savePhoto: (file: File) => void 
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({updateStatus, profile, status, isOwner, savePhoto, saveProfile}) => {


    let [editMode, setEditMode] = useState(false); 


    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
        
    }


    return (
    <div>
        <div className={s.titleText}>
            <Title>
                Profile user
            </Title>
        </div>
        
        
        
        <div className={s.photoBlock}>
            <div className={s.avaBlockAll}>
                <div className={s.avaBlock}>
                    <img src={profile.photos.large || userPhoto}/>
                </div>
                <div className={s.chancheAva}>
                    <label className={s.inputfile}>
                        {isOwner && <input type={"file"} name={"file"} onChange={onMainPhotoSelected} /> }
                        <span>Change photo</span>
                    </label>
                    
                </div>
            </div>
            
            <div className={s.infoBlock}>

                <ProfileStatusWithHooks className={s.statusBlock} status={status != null ? status : "User is not has status"} updateStatus={updateStatus} />


                {editMode 
                    ? <ProfieleDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
                    : <ProfieleData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/> }
                

            </div>
        </div>
    </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfieleData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.userDataBlock}>
        
        <div>
            <b>Full name</b>: {profile.fullName} 
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"} 
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription} 
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe} 
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={(key)} contactTitile={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            }) } 
        </div>
        {isOwner && <div><Button onClick={goToEditMode}>Edit</Button></div>}
    </div>
    )
}



type ContactsPropsType = {
    contactTitile: string
    contactValue: string
}

const Contact: FC<ContactsPropsType> = ({contactTitile, contactValue}) => {
    return(
        <div className={s.contact}>
            <b>{contactTitile}</b>: {contactValue}
        </div>
    )
}




export default ProfileInfo;