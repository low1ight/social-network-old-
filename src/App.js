import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FindUsersContainer from "./components/FindUsers/FindUsersContainer";
import ProfileConteiner from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner";
import {initializedSuccess} from "./redux/app-reducer";
import ProfileEdit from './components/ProfileEdit/ProfileEdit'
import './assets/font/fonts.css'
import './assets/commonStyles/commonStyles.css'
import cn from 'classnames'
import DialogsPage from "./components/DialogsPage/DialogsPage";


class App extends React.Component {
    componentDidMount() {
        this.props.initializedSuccess()
    }

    render() {

        if (!this.props.initializedState) return <LoadingSpinner/>;

        return (


            <div className="app-wrapper">
                <HeaderContainer/>
                <div className='content'>
                        <div className={cn('container', 'content-wrapper')}>
                            <Switch>
                                <Route path='/login'/>
                                <Route path='' render={() => <Navbar/>}/>
                            </Switch>
                            <Page/>
                        </div>
                </div>
            </div>
        );
    }
}


function Page() {
    return (
        <div className='page'>
            <Switch>
                <Route path="/profile/:userId?" render={() => <ProfileConteiner/>}/>
                <Route path="/find-users" render={() => <FindUsersContainer/>}/>
                <Route path="/dialogs/:userId?" render={() => <DialogsPage/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/edit' render={() => <ProfileEdit/>}/>
                <Redirect path='/' to='/profile'/>
            </Switch>
        </div>
    )
}


let mapStateToProps = (state) => {
    return {
        initializedState: state.app.initializedState
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {initializedSuccess}))(App)
