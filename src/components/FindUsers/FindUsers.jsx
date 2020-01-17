import React from 'react';
import UserItem from "./UserItem/UserItem";
import style from './FindUsers.module.css'
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";


function FindUser(props) {


    return (
            <div>
                {props.isFetching ?
                    <LoadingSpinner/> :

                    <div className={style.userWrapper}>
                        {props.users.map(u => <UserItem {...u} key={u.id} follow={props.follow}
                                                        unfollow={props.unfollow}
                                                        startDialog={props.startDialog}
                                                        followingProgress={props.followingProgress}
                        />)}
                    </div>
                }
            </div>

    )
}

export default FindUser;