import React, {useState} from 'react'
import cn from "classnames";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileInfoContactsItem from "./ProfileInfoContactsItem/ProfileInfoContactsItem";
import style from './ProfileInfo.module.css'
import {countHandler} from "../../../../utils/object-helper/object-helper";
import defaultPhoto from '../../../../assets/images/defaultUserAvatar.png'

function ProfileInfo(props) {

    const [infoPositionStatus, setInfoPositionStatus] = useState(false);




    return (
        <div className={cn('block', style.info)}>
            <div className={style.wrapper}>

                <div className={style.mainData}>
                    <div>
                        <img src={props.photo || defaultPhoto} alt=""/> {/*mobile version photo*/}
                        <div>
                            <p>{props.fullName ? props.fullName : `Missing name`}</p>
                            {props.isOwner ? <ProfileStatus profileStatus={props.profileStatus}
                                                            profileStatusUpdate={props.profileStatusUpdate}/> :
                                <span>{props.profileStatus}</span>}
                        </div>
                    </div>

                    <div className='customHr'></div>
                </div>
                <div className={style.mobileButtons}>{props.profileButtons}</div>

                <div className={style.restData}>
                    {!infoPositionStatus ?
                        <p className={style.lookingForJobText}>{props.lookingForAJob ? "Looking for work - ✔" : "Looking for work - ✖"}</p> :
                        <div>
                            <p className={style.lookingForJobText}>{props.lookingForAJob ? "Looking for work - ✔" : "Looking for work - ✖"}</p>
                            {props.lookingForAJob && props.lookingForAJobDescription ?
                                <InfoItem name={'Job description'} text={props.lookingForAJobDescription}/> : null}

                            {props.aboutMe ? <InfoItem name={'About me'} text={props.aboutMe}/> : null}
                            {countHandler(props.contacts) ?
                                <InfoItem name={'Contacts'} text={Object.keys(props.contacts).map(key =>
                                <div key={key}>{props.contacts[key] ? <ProfileInfoContactsItem ContactsName={key}
                                                                                               ContactsLink={props.contacts[key]}/> : null}</div>)}/> : null}

                        </div>}
                </div>
            </div>

            <div className={style.infoHeightToggle}><p
                onClick={() => setInfoPositionStatus(!infoPositionStatus)}>
                {infoPositionStatus ? 'Hide' : 'More details'}
            </p>
            </div>
        </div>
    )
}

function InfoItem({name, text}) {
    return (
        <div className={style.infoItem}>
             <span>
               {name}
             </span>
            <div>
                {text}
            </div>
        </div>
    )
}

export default ProfileInfo