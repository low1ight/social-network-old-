import React from 'react'
import ButtonWithPreloader from "../ButtonWithPreloader/ButtonWithPreloader";


function FollowUnfollowButton({isFollowed,followProgressArr,follow,unfollow,UserId}) {
    return (
        <>
            {isFollowed ?
            <ButtonWithPreloader isFetching={followProgressArr.some(id => id === UserId) }
                                 name={'Unsubscribe'}
                                 func={() => unfollow(UserId)}/>:
            <ButtonWithPreloader isFetching={followProgressArr.some(id => id === UserId)}
                                 name={'Subscribe'}
                                 func={() => follow(UserId)}/>}
        </>
    )
}
export default FollowUnfollowButton