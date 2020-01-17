import React from 'react'
import style from './ProfileInfoContactsItem.module.css'

function ProfileInfoContactsItem({ContactsName, ContactsLink}) {
    return (

        <div className={style.wrapper}>
            <span>{ContactsName}:</span>
            <a href={ContactsLink}>{ContactsLink}</a>
        </div>
    )
}

export default ProfileInfoContactsItem