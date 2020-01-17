import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import {NavLink} from "react-router-dom";


const Dialogs = React.memo(({dialogs,currentDialogId}) => {

        if (!dialogs) return <LoadingSpinner/>;
        if (dialogs.length === 0) return <div>You do not have dialogs, you can find someone to talk to in the <NavLink to='/find-users'>Find Users</NavLink>tab</div>

    return (
        <div className={style.wrapper}>
            {dialogs.map(dialog => <DialogItem key={dialog.id} isCurrentDialog={+currentDialogId === dialog.id} {...dialog}/>)}
        </div>
    )
})
export default Dialogs