import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    loadProfilePhoto,
    getCurrentUserProfile,
    profileStatusUpdate, pageFollow, pageUnfollow,
} from "../../redux/profile-reducer";
import {NavLink, withRouter} from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import {compose} from "redux";
import {startDialog} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import FollowUnfollowButton from "../common/FollowUnfollowButton/FollowUnfollowButton";
import cn from "classnames";
import style from "./ProfileHeader/ProfilePhoto/ProfilePhoto.module.css";


function ProfileContainer(props) {

    const [userId, setUserId] = useState(props.match.params.userId);
    const [isOwner, setIsOwner] = useState(!props.match.params.userId || +props.match.params.userId === props.currentUserId)

    useEffect(() => {
        setUserId(props.match.params.userId);
        setIsOwner(!props.match.params.userId || +props.match.params.userId === props.currentUserId)
    }, [props.match.params.userId]);


    useEffect(() => {
        if (!userId || isOwner) return;
        props.getCurrentUserProfile(userId);
    }, [userId]);

    const startDialogWithUser = () => {
        props.startDialog(props.match.params.userId)
    };


    const profileButtons = (
        <>
            {isOwner ?
            <NavLink to='/edit' className={cn('customButtonStyle', style.profileEditButton)}>
                <div>Edit profile</div>
            </NavLink> :
            <div className={style.otherProfileButtons}>
            <FollowUnfollowButton isFollowed={props.isFollow}
                                  followProgressArr={props.followingInProgress}
                                  follow={props.pageFollow} unfollow={props.pageUnfollow}
                                  UserId={props.match.params.userId}/>
            <button className='buttonStyle' onClick={startDialogWithUser} >Message</button>
        </div>}
        </>
    );



    if (props.isFetching) return <LoadingSpinner/>;

    return (
        <Profile profileButtons={profileButtons}
                 userProfile={isOwner ? props.authUserProfile : props.currentUserProfile}
                 currentUserId={props.currentUserId}
                 isOwner={isOwner}
                 profileStatusUpdate={props.profileStatusUpdate}
                 loadProfilePhoto={props.loadProfilePhoto}/>
    )

}

let mapStateToProps = (state) => {
    return {
        currentUserProfile: state.profilePage.currentUserProfile,
        authUserProfile: state.profilePage.authUserProfile,
        isFetching: state.profilePage.isFetching,
        currentUserId: state.auth.id,
        followingInProgress: state.findUsersPage.followingInProgress,
        isFollow: state.profilePage.isFollow
    }
};

export default compose(
    connect(mapStateToProps, {
        pageFollow,
        pageUnfollow,
        startDialog,
        getCurrentUserProfile,
        profileStatusUpdate,
        loadProfilePhoto
    }),
    withRouter,
    withAuthRedirect)(ProfileContainer)
