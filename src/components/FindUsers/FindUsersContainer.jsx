import React from 'react'
import {connect} from "react-redux";
import {
    setUserPageCount,
    follow,
    followingInProgress, getNewUser,
    getUsers,
    unfollow,
} from "../../redux/findUsers-reducer";
import FindUsers from "./FindUsers";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    currentPageSelector, followingProgressSelector,
    getUsersSelector, isFetchingSelector,
    maxUsersOnPageSelector, portionSizeSelector,
    userCountSelector
} from "../../redux/findUsers-selectors";
import {startDialog} from "../../redux/dialogs-reducer";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";


class FindUsersContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {isAcceptible:false,currentPage:1}
    }

    componentDidMount = () => {
        this.props.getUsers(this.state.currentPage);
        this.handleScroll();
        document.addEventListener("scroll", this.handleScroll)
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.currentPage > this.props.userPageCount) return;

        if(prevState.isAcceptible === false && this.state.isAcceptible ) {
            this.setState({currentPage:this.state.currentPage + 1})
        }
        if(prevState.currentPage !== this.state.currentPage) {
            this.props.getNewUser(this.state.currentPage)
        }



    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = () => {

        // if(this.props.currentPage > this.props.userPageCount) {
        //     document.removeEventListener("scroll", this.handleScroll)
        // }

        if (document.body.scrollHeight - 1000 <= window.pageYOffset + window.innerHeight) {
            this.setState({isAcceptible:true})
        } else {
            this.setState({isAcceptible:false})
        }
    };


    render = () => {
        return (
            <div>
                <FindUsers {...this.props}/>
                {this.state.currentPage > this.props.userPageCount || <LoadingSpinner/>}
            </div>
        )
    }
}

let mapStateToProps = (state) => {

    return {
        users: getUsersSelector(state),
        maxUsersOnPage: maxUsersOnPageSelector(state),
        userPageCount: userCountSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        followingProgress: followingProgressSelector(state),
        portionSize: portionSizeSelector(state)

    }
};


export default compose(
    connect(mapStateToProps, {startDialog,followingInProgress,getNewUser,unfollow, setUserPageCount, follow, getUsers}),
    withAuthRedirect)(FindUsersContainer)




