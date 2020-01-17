import React from 'react'
import style from './MessageItem.module.css'
import cn from 'classnames'
import {NavLink} from "react-router-dom";


function createMarkup(text) {
    return {__html: text};
}

function MessageItem({body,isAccountOwnerMessage,senderName,senderId,viewed}) {

    return (
        <div className={cn(style.wrapper,{[style.unreadMessage]:!viewed},isAccountOwnerMessage ? style.myMessage : style.friendMessage)}>
            <div className={cn(style.messageWrapper)}>
                <NavLink tabIndex='-1' to={`/profile/${senderId}`}>{senderName}</NavLink>
                <p dangerouslySetInnerHTML={createMarkup(body)}></p>
            </div>
        </div>
    )
}
export default MessageItem