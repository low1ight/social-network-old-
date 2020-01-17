import React from 'react'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";


function Profile(props) {

    if (!props.userProfile.profileData) return <LoadingSpinner/>

    return (
        <div>
            <ProfileHeader {...props}/>
        </div>

    )
}

export default Profile