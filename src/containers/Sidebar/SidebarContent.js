import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
// import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  componentDidMount(){
    console.log(this.props.authUser);
  }

  render() {
    const {themeType, navStyle, pathname, authUser} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          {/* <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          */}
          <CustomScrollbars className={themeType === THEME_TYPE_LITE ? 'ant-menu-lite gx-layout-sider-scrollbar' : 'ant-menu-dark gx-layout-sider-scrollbar'}>
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <MenuItemGroup key="bjbs" className="gx-menu-group" title={<UserProfile/>}>
                  <Menu.Item key="bjbs/home">
                        <Link to="/bjbs/home"><i className="icon icon-home"/>
                          <IntlMessages id="sidebar.home"/></Link>
                  </Menu.Item>

                  {
                    authUser ? authUser.access_menu.map(
                      (access_menu, i) => {
                        return (
                          <SubMenu title={
                              <span> <i className={access_menu.icon}/>
                              {access_menu.menu_name}</span>
                          } key={access_menu.menu_name}
                            className={this.getNavStyleSubMenuClass(navStyle)}>
                            {access_menu.sub_menu.map(
                              (sub_menu, j) => {
                                return (
                                  <Menu.Item key={j}>
                                        <Link to={sub_menu.hyper_link}><i className={sub_menu.icon}/>
                                          {sub_menu.sub_menu_name}</Link>
                                  </Menu.Item>
                                )
                              }
                            )}
                          </SubMenu>
                        )
                      }
                    ) : <li>..loading menu</li>
                  }
              </MenuItemGroup>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({
  settings,
  auth
}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  const {authUser} = auth;
  return {authUser, navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);
