import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
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

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            {/*<AppsNavigation/>*/}
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
                  <Menu.Item key="home">
                      <Link to="/home"><i className="icon icon-home"/>
                          <IntlMessages id="sidebar.home"/></Link>
                  </Menu.Item>

                  <SubMenu key="dashboard" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-dasbhoard"/>
                         <IntlMessages id="sidebar.dashboard"/></span>}>
                      <Menu.Item key="dashboard/riskprofile">
                        <Link to="/dashboard/riskprofile"><i className="icon icon-profile"/>
                          <IntlMessages id="sidebar.dashboard.riskprofile"/></Link>
                      </Menu.Item>
                      <Menu.Item key="dashboard/grafikuser">
                        <Link to="/dashboard/grafikuser"><i className="icon icon-growth"/>
                          <IntlMessages id="sidebar.dashboard.grafikuser"/></Link>
                      </Menu.Item>
                      <Menu.Item key="dashboard/grafikperingkatkonsolidasi">
                        <Link to="/dashboard/grafikperingkatkonsolidasi"><i className="icon icon-chart-line"/>
                          <IntlMessages id="sidebar.dashboard.grafikperingkatkonsolidasi"/></Link>
                      </Menu.Item>
                  </SubMenu>

                  <SubMenu key="masterdata" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-inbox"/>
                         <IntlMessages id="sidebar.masterdata"/></span>}>
                      <Menu.Item key="masterdata/jenisrisiko">
                          <Link to="/masterdata/jenisrisiko">
                              <i className="icon icon-affix"/>
                              <IntlMessages id="sidebar.masterdata.risiko"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="masterdata/jenispenilaian">
                          <Link to="/masterdata/jenispenilaian">
                              <i className="icon icon-data-display"/>
                              <IntlMessages id="sidebar.masterdata.penilaian"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="masterdata/jenisperingkatrisiko">
                          <Link to="/masterdata/jenisperingkatrisiko">
                              <i className="icon icon-crm"/>
                              <IntlMessages id="sidebar.masterdata.peringkatrisiko"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="masterdata/faktor">
                          <Link to="/masterdata/faktor">
                              <i className="icon icon-badge"/>
                              <IntlMessages id="sidebar.masterdata.faktor"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="masterdata/parameter">
                          <Link to="/masterdata/parameter">
                              <i className="icon icon-listing-dbrd"/>
                              <IntlMessages id="sidebar.masterdata.parameter"/>
                          </Link>
                      </Menu.Item>
                  </SubMenu>
              </MenuItemGroup>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

