import React, {useState,useRef} from 'react'
import style from './Messages.module.css'
import {createNewField, MessageArea} from "../../common/inputs/inputs";
import {reduxForm} from "redux-form";

import cn from 'classnames'
import {MessageContent} from "./MessageContent/MessageContent";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import {faChevronDown, faChevronLeft, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";


const Messages = React.memo((props) => {
    const [isAcceptableDistance, setAcceptableDistanceStatus] = useState(false);

    const ref = useRef();


    if (!props.dialogs) return <LoadingSpinner/>;
    if (!props.interlocutorId) {
        return <div className='blockMessage'><p>Please select dialog</p></div>;
    } else if (props.dialogs.filter(m => m.id === +props.interlocutorId).length === 0) {
        return <div className='blockMessage'><p>Dialog with the user is missing!</p></div>;
    }


    const scrollBottom = () => {
        ref.current.scrollTop = ref.current.scrollHeight
    };

    const IsAcceptableDistanceToScrollBottom = () => {
        ref.current.scrollTop + ref.current.clientHeight + 300 > ref.current.scrollHeight ?
            setAcceptableDistanceStatus(false) :
            setAcceptableDistanceStatus(true)


    };


    const SubmitSendMessage = (data) => {
        if (!data.message || !props.interlocutorId) return;
        props.sendMessage(props.interlocutorId, data.message).then(() => scrollBottom())
    };


    return (

        <div onScroll={IsAcceptableDistanceToScrollBottom} className={style.wrapper}>
            <NavLink to='/dialogs' ><FontAwesomeIcon icon={faChevronLeft}/><p>Change dialog</p></NavLink>
            <MessageContent ref={ref}
                            isAcceptableDistance={isAcceptableDistance}
                            scrollBottom={scrollBottom}
                            clearMessage={props.clearMessage}
                            interlocutorId={props.interlocutorId}
                            accountOwnerId={props.accountOwnerId}
                            message={props.message}
                            getCurrentDialogsMessage={props.getCurrentDialogsMessage}/>
                            <div className={style.form}>
                                <MessageFormContainer scrollBottom={scrollBottom} isAcceptableDistance={isAcceptableDistance}
                                                      onSubmit={SubmitSendMessage}/>
                            </div>

        </div>
    )
});


export function MessageForm(props) {

    const handleKeyDown = (e, cb) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        cb();
    };

    return (

            <form onSubmit={props.handleSubmit} onKeyDown={(e) => {
                handleKeyDown(e, props.handleSubmit)
            }}>
                <div className={style.formWrapper}>
                    <div className={style.messageForm}>
                        <div>
                            {createNewField("Your message...", "message", null, MessageArea,)}
                        </div>
                        <div>
                            <button className={cn('invisibleButton', style.sendMessageIcon)}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                    <div onClick={props.scrollBottom} className={cn(style.scrollBottomButton, 'block', {[style.active]: props.isAcceptableDistance})}>
                        <FontAwesomeIcon  icon={faChevronDown} />
                    </div>


                </div>
            </form>

    )
}

let MessageFormContainer = reduxForm({form: 'Message'})(MessageForm);


export default Messages