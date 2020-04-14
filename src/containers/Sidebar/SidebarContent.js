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
import SignOutApp from "./SignOutApp";

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

              <MenuItemGroup key="bjbs" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
                  <Menu.Item key="bjbs/home">
                      <Link to="/bjbs/home"><i className="icon icon-home"/>
                          <IntlMessages id="sidebar.home"/></Link>
                  </Menu.Item>

                  <SubMenu key="dashboard" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-dasbhoard"/>
                         <IntlMessages id="sidebar.dashboard"/></span>}>
                      <Menu.Item key="bjbs/dashboard/riskprofile">
                        <Link to="/bjbs/dashboard/riskprofile"><i className="icon icon-profile"/>
                          <IntlMessages id="sidebar.dashboard.riskprofile"/></Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/dashboard/grafikuser">
                        <Link to="/bjbs/dashboard/grafikuser"><i className="icon icon-growth"/>
                          <IntlMessages id="sidebar.dashboard.grafikuser"/></Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/dashboard/grafikperingkatkonsolidasi" className="gx-wrap-sidebar">
                        <Link to="/bjbs/dashboard/grafikperingkatkonsolidasi"><i className="icon icon-chart-line"/>
                          <IntlMessages id="sidebar.dashboard.grafikperingkatkonsolidasi"/></Link>
                      </Menu.Item>
                  </SubMenu>

                  <SubMenu key="masterdata" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-inbox"/>
                         <IntlMessages id="sidebar.masterdata"/></span>}>
                      <Menu.Item key="bjbs/masterdata/jenisrisiko">
                          <Link to="/bjbs/masterdata/jenisrisiko">
                              <i className="icon icon-affix"/>
                              <IntlMessages id="sidebar.masterdata.risiko"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/masterdata/jenispenilaian">
                          <Link to="/bjbs/masterdata/jenispenilaian">
                              <i className="icon icon-data-display"/>
                              <IntlMessages id="sidebar.masterdata.penilaian"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/masterdata/jenisperingkatrisiko">
                          <Link to="/bjbs/masterdata/jenisperingkatrisiko">
                              <i className="icon icon-crm"/>
                              <IntlMessages id="sidebar.masterdata.peringkatrisiko"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/masterdata/faktor">
                          <Link to="/bjbs/masterdata/faktor">
                              <i className="icon icon-badge"/>
                              <IntlMessages id="sidebar.masterdata.faktor"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/masterdata/parameter">
                          <Link to="/bjbs/masterdata/parameter">
                              <i className="icon icon-listing-dbrd"/>
                              <IntlMessages id="sidebar.masterdata.parameter"/>
                          </Link>
                      </Menu.Item>
                  </SubMenu>

                  <SubMenu key="keperluandata" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-files"/>
                         <IntlMessages id="sidebar.keperluandata"/></span>}>
                      <Menu.Item key="bjbs/keperluandata/debiturinti">
                          <Link to="/bjbs/keperluandata/debiturinti">
                              <i className="icon icon-company"/>
                              <IntlMessages id="sidebar.keperluandata.debiturinti"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/ayda">
                          <Link to="/bjbs/keperluandata/ayda">
                              <i className="icon icon-autocomplete"/>
                              <IntlMessages id="sidebar.keperluandata.ayda"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/asetlukuid">
                          <Link to="/bjbs/keperluandata/asetlukuid">
                              <i className="icon icon-etherium"/>
                              <IntlMessages id="sidebar.keperluandata.asetlukuid"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/manajemensdi">
                          <Link to="/bjbs/keperluandata/manajemensdi">
                              <i className="icon icon-timeline-with-icons"/>
                              <IntlMessages id="sidebar.keperluandata.manajemensdi"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/frekmaterialitas">
                          <Link to="/bjbs/keperluandata/frekmaterialitas">
                              <i className="icon icon-frequent"/>
                              <IntlMessages id="sidebar.keperluandata.frekmaterialitas"/>
                          </Link>
                      </Menu.Item>
                      {/* Keperluan Data 2 */}
                      <Menu.Item key="bjbs/keperluandata/roa">
                          <Link to="/bjbs/keperluandata/roa">
                              <i className="icon icon-ripple"/>
                              <IntlMessages id="sidebar.keperluandata.roa"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/k020">
                          <Link to="/bjbs/keperluandata/k020">
                              <i className="icon icon-map-km-layer"/>
                              <IntlMessages id="sidebar.keperluandata.k020"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/datamaturityprofile">
                          <Link to="/bjbs/keperluandata/datamaturityprofile">
                              <i className="icon icon-auth-screen"/>
                              <IntlMessages id="sidebar.keperluandata.datamaturityprofile"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/norminatifk241">
                          <Link to="/bjbs/keperluandata/norminatifk241">
                              <i className="icon icon-noodles"/>
                              <IntlMessages id="sidebar.keperluandata.norminatifk241"/>
                          </Link>
                      </Menu.Item>
                      {/* Keperluan Data 3 */}
                      <Menu.Item key="bjbs/keperluandata/neracalabarugi">
                          <Link to="/bjbs/keperluandata/neracalabarugi">
                              <i className="icon icon-transfer"/>
                              <IntlMessages id="sidebar.keperluandata.neracalabarugi"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/rasiocar">
                          <Link to="/bjbs/keperluandata/rasiocar">
                              <i className="icon icon-backtop"/>
                              <IntlMessages id="sidebar.keperluandata.rasiocar"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/lsmk">
                          <Link to="/bjbs/keperluandata/lsmk">
                              <i className="icon icon-cascader"/>
                              <IntlMessages id="sidebar.keperluandata.lsmk"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/datafraud">
                          <Link to="/bjbs/keperluandata/datafraud">
                              <i className="icon icon-family"/>
                              <IntlMessages id="sidebar.keperluandata.datafraud"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/maturitysistem">
                          <Link to="/bjbs/keperluandata/maturitysistem">
                              <i className="icon icon-schedule"/>
                              <IntlMessages id="sidebar.keperluandata.maturitysistem"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/datalitigasi">
                          <Link to="/bjbs/keperluandata/datalitigasi">
                              <i className="icon icon-team"/>
                              <IntlMessages id="sidebar.keperluandata.datalitigasi"/>
                          </Link>
                      </Menu.Item>
                      {/* Keperluan Data 4 */}
                      <Menu.Item key="bjbs/keperluandata/rbb">
                          <Link to="/bjbs/keperluandata/rbb">
                              <i className="icon icon-invert-color"/>
                              <IntlMessages id="sidebar.keperluandata.rbb"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/keperluandata/datafrekuensipelanggaran">
                          <Link to="/bjbs/keperluandata/datafrekuensipelanggaran">
                              <i className="icon icon-important-o"/>
                              <IntlMessages id="sidebar.keperluandata.datafrekuensipelanggaran"/>
                          </Link>
                      </Menu.Item>
                  </SubMenu>
                  {/* Laporan */}
                  <SubMenu key="laporan" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-feedback"/>
                         <IntlMessages id="sidebar.laporan"/></span>}>
                      <Menu.Item key="bjbs/laporan/laporanprofilrisikokeojk">
                          <Link to="/bjbs/laporan/laporanprofilrisikokeojk">
                              <i className="icon icon-product-grid"/>
                              <IntlMessages id="sidebar.laporan.laporanprofilrisikokeojk"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/laporan/laporanpertriwulan">
                          <Link to="/bjbs/laporan/laporanpertriwulan">
                              <i className="icon icon-select"/>
                              <IntlMessages id="sidebar.laporan.laporanpertriwulan"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/laporan/laporanakhirtahun">
                          <Link to="/bjbs/laporan/laporanakhirtahun">
                              <i className="icon icon-tasks"/>
                              <IntlMessages id="sidebar.laporan.laporanakhirtahun"/>
                          </Link>
                      </Menu.Item>
                  </SubMenu>
                  {/* Profile User */}
                  <SubMenu key="profileuser" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-user-o"/>
                         <IntlMessages id="sidebar.profileuser"/></span>}>
                      <Menu.Item key="bjbs/profileuser/kotakmasuk">
                          <Link to="/bjbs/profileuser/kotakmasuk">
                              <i className="icon icon-mail-open"/>
                              <IntlMessages id="sidebar.profileuser.kotakmasuk"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/profileuser/ubahpassword">
                          <Link to="/bjbs/profileuser/ubahpassword">
                              <i className="icon icon-forgot-password"/>
                              <IntlMessages id="sidebar.profileuser.ubahpassword"/>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="bjbs/profileuser/ubahpin">
                          <Link to="/bjbs/profileuser/ubahpin">
                              <i className="icon icon-reset-password"/>
                              <IntlMessages id="sidebar.profileuser.ubahpin"/>
                          </Link>
                      </Menu.Item>
                  </SubMenu>
                  {/*Lain-Lain*/}
                  <SubMenu key="lainlain" className={this.getNavStyleSubMenuClass(navStyle)}
                           title={<span> <i className="icon icon-setting"/>
                         <IntlMessages id="sidebar.lainlain"/></span>}>
                      <Menu.Item key="bjbs/lainlain/logout">
                         <SignOutApp/>
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

