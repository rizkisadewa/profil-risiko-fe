import React, {Component} from "react";
import {connect} from "react-redux";
// import {Avatar, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";
import IntlMessages from "../../util/IntlMessages";

class UserProfile extends Component {

  render() {
    const {authUser} = this.props;
    console.log("authUser", authUser)
    // const userMenuOptions = (
    //   <ul className="gx-user-popover">
    //     <li>My Account</li>
    //     <li>Connections</li>
    //     <li onClick={() => this.props.userSignOut()}>Logout
    //     </li>
    //   </ul>
    // );

    return (

      <span>
        {authUser ? authUser : <IntlMessages id="sidebar.main"/>}
        {/*<Popover placement="bottomRight" content={userMenuOptions} trigger="click">
          <Avatar src='https://via.placeholder.com/150x150'
                  className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
          <span className="gx-avatar-name">{authUser ? authUser.name : "Loading"}<i
            className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
        </Popover>*/}
      </span>

    )

  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser}
};

export default connect(mapStateToProps, {userSignOut})(UserProfile);
