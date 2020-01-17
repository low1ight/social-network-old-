import React,{useState,useEffect} from 'react'
import style from './ProfileStatus.module.css'
import cn from 'classnames'

function ProfileStatus(props) {
    let [editMode,setEditMode] = useState(false);
    let [status,setStatus] = useState(props.profileStatus);


    useEffect(() => {

        setStatus(props.profileStatus)
    },[props.profileStatus]);

    const activateEditMode = () => {
        setEditMode(true)
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.profileStatusUpdate(status)
    };
    const changeLocalStatus = (e) => {
        setStatus(e.currentTarget.value)
    };


        return (
            <div className={cn(style.wrapper,{[style.text]:!editMode})}>

                {!editMode &&
                <div className={style.textWrapper} onClick={activateEditMode}><span>{props.profileStatus || 'Введите статус...'}</span></div>}

                {editMode &&
                <div className={style.inputWrapper}><input autoFocus={true} maxLength={30} value={status} onChange={changeLocalStatus} onBlur={deactivateEditMode} type="text"/></div>}
            </div>
        )
}
export default ProfileStatus;