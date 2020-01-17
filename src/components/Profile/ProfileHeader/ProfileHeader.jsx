import React from 'react';
import style from './ProfileHeader.module.css'
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import cn from 'classnames'


function ProfileHeader(props) {

    const loadNewPhoto = (e) => {
        if (e.target.files.length === 1) {
            props.loadProfilePhoto(e.target.files[0]);
        }
    };

    return (
        <div className={cn(style.profileTop)}>
            <ProfilePhoto isOwner={props.isOwner}
                          profileButtons={props.profileButtons}
                          loadNewPhoto={loadNewPhoto}
                          photo={props.userProfile.profileData.photos.large}
                          />
            <ProfileInfo {...props.userProfile.profileData}
                         photo={props.userProfile.profileData.photos.large}
                         isOwner={props.isOwner}
                         profileButtons={props.profileButtons}
                         profileStatus={props.userProfile.profileStatus}
                         profileStatusUpdate={props.profileStatusUpdate}
                          />
        </div>
    )
}

export default ProfileHeader