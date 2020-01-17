import React from 'react'
import style from './DialogItem.module.css'
import {NavLink} from "react-router-dom";
import cn from 'classnames'


function DialogItem({userName, photos, lastDialogActivityDate, newMessagesCount,id,isCurrentDialog}) {
    return (
        <NavLink to={`/dialogs/${id}`}>
            <div className={cn(style.wrapper,{[style.active]:isCurrentDialog})}>
                <img src={photos.small} alt=""/>
                <div className={style.name}>{userName}</div>
                <div className={style.date}>{lastDialogActivityDate.slice(0, 10)}</div>
                {newMessagesCount !== 0 && !isCurrentDialog && <div className={style.newMessageCount}><span>{newMessagesCount}</span></div>}
            </div>
        </NavLink>
    )
}

export default DialogItem