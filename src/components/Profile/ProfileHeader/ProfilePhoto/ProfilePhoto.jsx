import React, {useState} from 'react'
import style from './ProfilePhoto.module.css'
import cn from "classnames";
import defaultPhoto from "../../../../assets/images/defaultUserAvatar.png";
import ProfileEditIcon from "../../../../assets/images/userEditIcon.png";



function ProfilePhoto({photo, loadNewPhoto,profileButtons, isOwner}) {

    const [profileEditIconVisible, setProfileEditIconVisible] = useState(false)

    return (


        <div className={cn('block', style.photoContainer)}>

            <div onMouseEnter={() => setProfileEditIconVisible(true)}
                 onMouseLeave={() => setProfileEditIconVisible(false)}
                 className={style.photoItem}>
                <img alt='UserPhoto' src={photo ? photo : defaultPhoto} className={style.photo}/>
                {isOwner && <div className={cn(style.changePhoto, {[style.active]: profileEditIconVisible})}>
                    <label htmlFor='profilePhotoInput'><img alt='profileEdit' src={ProfileEditIcon}/></label>
                    <input id='profilePhotoInput' onChange={loadNewPhoto} type="file"/>
                </div>}
            </div>
            {profileButtons}
        </div>
    )
}

export default ProfilePhoto
