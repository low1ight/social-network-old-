import React from 'react'
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Checkbox, createNewField, InputArea, Textarea} from "../common/inputs/inputs";
import {editProfile, profileLoader} from "../../redux/profile-reducer";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import {descriptionMaxLength, fullNameMaxLength, required} from "../../utils/validators/validators";
import style from './ProfileEdit.module.css'
import cn from 'classnames'
import ButtonWithPreloader from "../common/ButtonWithPreloader/ButtonWithPreloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

function ProfileEditContainer(props) {

    if (!props.profile) return <LoadingSpinner/>;

    const editProfileOnSubmit = (data) => {
        props.editProfile(data,props.authUserId)
    };

    return (
        <ProfileEdit editProfileOnSubmit={editProfileOnSubmit} {...props}/>
    )
}


function ProfileEdit({buttonIsFetching,profile,editProfileOnSubmit}) {


    return (
        <div className={cn('block',style.wrapper)}>
            <ProfileEditFormContainer contacts={profile.contacts}
                                      onSubmit={editProfileOnSubmit}
                                      initialValues={profile}
                                      buttonIsFetching={buttonIsFetching}/>
        </div>
    )
}

function ProfileEditForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={cn(style.formWrapper)}>
                <div className={style.tabHeader}><p>Main profile info</p></div>
                <div className={style.mainData}>
                    <div>
                        <b>Full Name</b>
                        {createNewField('Full Name', 'fullName', [fullNameMaxLength, required], InputArea)}
                    </div>
                    <div>
                        <b>About me</b>
                        {createNewField('About Me', 'aboutMe', [descriptionMaxLength,required], Textarea)}</div>
                    <div>
                        {createNewField(null, 'lookingForAJob', null, Checkbox,{checkboxname:"Looking For A Job",})}
                    </div>
                    <div>
                        <b>Job Descriptions</b>
                        {createNewField('Job descriptions', 'lookingForAJobDescription', [descriptionMaxLength,required], Textarea)}
                    </div>
                </div>
                <div className={style.tab}><p>Contact</p></div>
                <div className={style.contactsData}>
                    {Object.keys(props.contacts).map(key =>
                        <div key={key}><b>{key.toUpperCase()}</b>{createNewField(null, `contacts.${key}`, null, InputArea)}</div>)}
                        <div className={style.button}><ButtonWithPreloader isFetching={props.buttonIsFetching} name={'Confirm changes'}/></div>
                </div>
            </div>

        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.authUserProfile.profileData,
        authUserId: state.auth.id,
        buttonIsFetching:state.profilePage.buttonIsFetching
    }
};


let ProfileEditFormContainer = reduxForm({form: 'ProfileEdit'})(ProfileEditForm);

export default compose(connect(mapStateToProps, {profileLoader, editProfile}), withAuthRedirect)(ProfileEditContainer)