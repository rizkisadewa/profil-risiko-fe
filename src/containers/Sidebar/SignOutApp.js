import React, {Component} from "react";
import {connect} from "react-redux";
import {userSignOut} from "appRedux/actions/Auth";
import IntlMessages from "../../util/IntlMessages";

class SignOutApp extends Component {

    render() {
        const {authUser} = this.props;
        console.log("authUser", authUser)
        const userMenuOptions = (
            <span className="ant-menu-item" ref={element => {
                if (element) element.style.setProperty('padding', '0', 'important');
            }} onClick={() => this.props.userSignOut()}>
                <i className="icon icon-signin"/>
                <IntlMessages id="sidebar.lainlain.logout"/>
            </span>
        );

        return (
            <>
                {userMenuOptions}
            </>
        )

    }
}

const mapStateToProps = ({auth}) => {
    const {authUser} = auth;
    return {authUser}
};

export default connect(mapStateToProps, {userSignOut})(SignOutApp);
