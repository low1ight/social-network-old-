import React from 'react';
import style from './UserItem.module.css'
import userPhoto from '../../../assets/images/defaultUserAvatar.png'
import {NavLink} from "react-router-dom";
import cn from 'classnames'
import ButtonWithPreloader from "../../common/ButtonWithPreloader/ButtonWithPreloader";
import FollowUnfollowButton from "../../common/FollowUnfollowButton/FollowUnfollowButton";




function UserItem(props) {

    return (
        <div className={cn(style.wrapper,'block')}>
            <div className={cn(style.imgDiv)}>
                <NavLink to={`/profile/${props.id}`}>
                    <img src={props.photos.small ? props.photos.small : userPhoto} alt=""/>
                </NavLink>
            </div>
            <div className={style.buttonDiv}>

                    <FollowUnfollowButton isFollowed={props.followed}
                                          followProgressArr={props.followingProgress}
                                          follow={props.follow}
                                          unfollow={props.unfollow}
                                          UserId={props.id}/>
                    <ButtonWithPreloader isFetching={false} name={'Messages'} func={() => props.startDialog(props.id)}/>
            </div>
            <NavLink to={`/profile/${props.id}`} className={style.nameDiv}>{props.name}</NavLink>
            <div className={style.statusDiv}>{props.status}</div>
        </div>
    )
}

export default UserItem