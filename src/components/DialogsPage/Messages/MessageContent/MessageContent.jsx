import React, {useEffect} from 'react'
import style from './MessageContent.module.css'
import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import MessageItem from "./MessageItem/MessageItem";


export const MessageContent = React.forwardRef((props, ref) => {

    useEffect(() => {
        props.getCurrentDialogsMessage(props.interlocutorId);
        return () => props.clearMessage()
    }, [props.interlocutorId]);

    useEffect(() => {
        props.scrollBottom()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!props.message]);

    useEffect(() => {
        if (props.isAcceptableDistance) {
            props.scrollBottom()
        }
    }, [props.message]);


    return (

        <div ref={ref} className={style.messagesWrapper}>
            {!props.message ? <LoadingSpinner/> :
                props.message.length === 0 ? <div className='blockMessage'><p>Message history is missing!</p></div> :
                    props.message.map(m => <MessageItem isAccountOwnerMessage={m.senderId === props.accountOwnerId}
                                                        key={m.id}
                                                        {...m}/>)}
        </div>


    )
});
