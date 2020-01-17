import React, {useEffect} from 'react'
import style from './DialogsPage.module.css'
import cn from 'classnames'
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import {connect} from "react-redux";
import {
    clearMessage,
    getCurrentDialogsMessage,
    getDialogs, sendMessage,
} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {withRouter} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const DialogsPage = React.memo((props) => {

    return (
        <div className={cn(style.wrapper, 'block',!props.match.params.userId ? style.showDialogs : style.showMessage)}>
            <Dialogs  currentDialogId={props.match.params.userId} dialogs={props.dialogs}/>
            <Messages sendMessage={props.sendMessage}
                      dialogs={props.dialogs}
                      getCurrentDialogsMessage={props.getCurrentDialogsMessage}
                      accountOwnerId={props.accountOwnerId}
                      message={props.message}
                      clearMessage={props.clearMessage}
                      interlocutorId={props.match.params.userId}/>
        </div>
    )
})


function DialogPageContainer(props) {

    useEffect(() => {
        props.getDialogs(props.match.params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.unreadMessageCount !== props.newMessageCount]);


    return (
        <DialogsPage {...props}/>
    )

}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogs.dialogs,
        message: state.dialogs.currentDialogsMessage,
        accountOwnerId: state.auth.id,
        unreadMessageCount: state.dialogs.unreadMessageCount,
        messageIsFetching: state.dialogs.messageIsFetching,
        newMessageCount: state.dialogs.newMessageCount,
        initialDialogs: state.dialogs.initialDialogs,
    }
};

export default compose(connect(mapStateToProps, {
        getDialogs,
        getCurrentDialogsMessage,
        clearMessage,
        sendMessage
    }),
    withRouter,
    withAuthRedirect)(DialogPageContainer)