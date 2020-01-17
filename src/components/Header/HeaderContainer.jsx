import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";

import {headerSetAuth, logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        id:state.auth.id,
        isAuth: state.auth.isAuth,
        photos: state.profilePage.authUserProfile,
    }
};

export default connect(mapStateToProps, {headerSetAuth,logout})(HeaderContainer)