{/*
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
*/}

{/*
<SubMenu key="risikoinheren" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-auth-screen"/>
       <IntlMessages id="sidebar.risikoinheren"/></span>}>

    {/* RISIKO INHEREN */}

    {/*
    <Menu.Item key="bjbs/risikoinheren/parameterfaktor">
        <Link to="/bjbs/risikoinheren/parameterfaktor">
            <i className="icon icon-badge"/>
            <IntlMessages id="sidebar.risikoinheren.parameterfaktor"/>
        </Link>
    </Menu.Item>

    {/*
    <Menu.Item key="bjbs/risikoinheren/ratioindikator">
        <Link to="/bjbs/risikoinheren/ratioindikator">
            <i className="icon icon-crm"/>
            <IntlMessages id="sidebar.risikoinheren.ratioindikator"/>
        </Link>
    </Menu.Item>
    */}

    {/*
    <Menu.Item key="bjbs/risikoinheren/parametermanual">
        <Link to="/bjbs/risikoinheren/parametermanual">
            <i className="icon icon-select"/>
            <IntlMessages id="sidebar.risikoinheren.parametermanual"/>
        </Link>
    </Menu.Item>
    */}
    {/*
    <Menu.Item key="bjbs/risikoinheren/parameterkuantitatif">
        <Link to="/bjbs/risikoinheren/parameterkuantitatif">
            <i className="icon icon-ckeditor"/>
            <IntlMessages id="sidebar.risikoinheren.parameterkuantitatif"/>
        </Link>
    </Menu.Item>
    {/*
    <Menu.Item key="bjbs/risikoinheren/parameterkualitatif">
        <Link to="/bjbs/risikoinheren/parameterkualitatif">
            <i className="icon icon-basic-calendar"/>
            <IntlMessages id="sidebar.risikoinheren.parameterkualitatif.multiplelalternatif"/>
        </Link>
    </Menu.Item>
    <Menu.Item key="bjbs/risikoinheren/parameterkualitatifdualalternatif">
        <Link to="/bjbs/risikoinheren/parameterkualitatifdualalternatif">
            <i className="icon icon-feedback"/>
            <IntlMessages id="sidebar.risikoinheren.parameterkualitatif.dualalternatif"/>
        </Link>
    </Menu.Item>

</SubMenu>
*/}

<SubMenu key="kpmr" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-editor"/>
       <IntlMessages id="sidebar.kpmr"/></span>}>
   <Menu.Item key="bjbs/kpmr/parameterfaktor">
       <Link to="/bjbs/kpmr/parameterfaktor">
           <i className="icon icon-badge"/>
           <IntlMessages id="sidebar.kpmr.parameterfaktor"/>
       </Link>
   </Menu.Item>
   {/*
   <Menu.Item key="bjbs/kpmr/ratioindikator">
      <Link to="/bjbs/kpmr/ratioindikator">
          <i className="icon icon-crm"/>
          <IntlMessages id="sidebar.kpmr.ratioindikator"/>
      </Link>
   </Menu.Item>
   */}
   <Menu.Item key="bjbs/kpmr/parameterkualitatif">
      <Link to="/bjbs/kpmr/parameterkualitatif">
          <i className="icon icon-feedback"/>
          <IntlMessages id="sidebar.kpmr.parameterkualitatif"/>
      </Link>
   </Menu.Item>
</SubMenu>

{/* Data Input Risiko Inheren */}
<SubMenu key="datainput" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-data-entry"/>
       <IntlMessages id="sidebar.datainput.risikoinheren"/></span>}>
    <Menu.Item key="bjbs/datainput/risikoinheren/datakuantitatif">
        <Link to="/bjbs/datainput/risikoinheren/datakuantitatif">
            <i className="icon icon-table"/>
            <IntlMessages id="sidebar.datainput.risikoinheren.kuantitatif"/>
        </Link>
    </Menu.Item>
    <Menu.Item key="bjbs/datainput/risikoinheren/datakualitatif/multi-alternatif">
        <Link to="/bjbs/datainput/risikoinheren/datakualitatif/multi-alternatif">
            <i className="icon icon-table-general"/>
            <IntlMessages id="sidebar.datainput.risikoinheren.kualitatif.multialternatif"/>
        </Link>
    </Menu.Item>
    <Menu.Item key="bjbs/datainput/risikoinheren/datakualitatif/dual-alternatif">
        <Link to="/bjbs/datainput/risikoinheren/datakualitatif/dual-alternatif">
            <i className="icon icon-table-general"/>
            <IntlMessages id="sidebar.datainput.risikoinheren.kualitatif.dualalternatif"/>
        </Link>
    </Menu.Item>
</SubMenu>

{/* Data Input KPMR */}
<SubMenu key="datainput-kpmr" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-data-entry"/>
       <IntlMessages id="sidebar.datainput.kpmr"/></span>}>
    <Menu.Item key="bjbs/datainput/kpmr/datakualitatif/multi-alternatif">
        <Link to="/bjbs/datainput/kpmr/datakualitatif/multi-alternatif">
            <i className="icon icon-table"/>
            <IntlMessages id="sidebar.datainput.kpmr.kualitatif"/>
        </Link>
    </Menu.Item>
</SubMenu>

{/*
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
            <i className="icon icon-product-grid"/>
            <IntlMessages id="sidebar.keperluandata.datamaturityprofile"/>
        </Link>
    </Menu.Item>
    <Menu.Item key="bjbs/keperluandata/norminatifk241">
        <Link to="/bjbs/keperluandata/norminatifk241">
            <i className="icon icon-noodles"/>
            <IntlMessages id="sidebar.keperluandata.norminatifk241"/>
        </Link>
    </Menu.Item>

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
*/}

<SubMenu key="masterdata" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-inbox"/>
       <IntlMessages id="sidebar.masterdata"/></span>}>
   <Menu.Item key="bjbs/risikoinheren/jenisrisiko">
       <Link to="/bjbs/risikoinheren/jenisrisiko">
           <i className="icon icon-affix"/>
           <IntlMessages id="sidebar.risikoinheren.risiko"/>
       </Link>
   </Menu.Item>
    <Menu.Item key="bjbs/masterdata/jenispenilaian">
        <Link to="/bjbs/masterdata/jenispenilaian">
            <i className="icon icon-data-display"/>
            <IntlMessages id="sidebar.masterdata.penilaian"/>
        </Link>
    </Menu.Item>
    {/* Master Ratio Indikator */}

    <Menu.Item key="bjbs/masterdata/ratioindikator">
        <Link to="/bjbs/masterdata/ratioindikator">
            <i className="icon icon-map-popup-info"/>
            <IntlMessages id="sidebar.masterdata.ratioindikator"/>
        </Link>
    </Menu.Item>

</SubMenu>

{/* Laporan */}
<SubMenu key="laporan" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-data-display"/>
       <IntlMessages id="sidebar.laporan"/></span>}>
    <Menu.Item key="bjbs/laporan/laporanrisikoinheren">
        <Link to="/bjbs/laporan/laporanrisikoinheren">
            <i className="icon icon-product-grid"/>
            <IntlMessages id="sidebar.laporan.risikoinheren"/>
        </Link>
    </Menu.Item>
    <Menu.Item key="bjbs/laporan/laporankpmr">
        <Link to="/bjbs/laporan/laporankpmr">
            <i className="icon icon-select"/>
            <IntlMessages id="sidebar.laporan.kpmr"/>
        </Link>
    </Menu.Item>
</SubMenu>

{/* Laporan Locked */}
<SubMenu key="laporan-risikoinheren-locked" className={this.getNavStyleSubMenuClass(navStyle)}
         title={<span> <i className="icon icon-data-display"/>
       <IntlMessages id="sidebar.laporan.locked"/></span>}>
    <Menu.Item key="bjbs/laporan-locked/risikoinheren">
        <Link to="/bjbs/laporan-locked/risikoinheren">
            <i className="icon icon-product-grid"/>
            <IntlMessages id="sidebar.laporan.locked.risikoinheren"/>
        </Link>
    </Menu.Item>

    <Menu.Item key="bjbs/laporan-locked/kpmr">
        <Link to="/bjbs/laporan-locked/kpmr">
            <i className="icon icon-product-grid"/>
            <IntlMessages id="sidebar.laporan.locked.kpmr"/>
        </Link>
    </Menu.Item>
</SubMenu>


{/* Profile User */}
{/*
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
*/}

{/*Lain-Lain*/}
{/*
<Menu.Item key="bjbs/lainlain">
    <Link to="/bjbs/lainlain">
        <i className="icon icon-setting"/>
        <IntlMessages id="sidebar.lainlain"/>
    </Link>
</Menu.Item>


<Menu.Item key="bjbs/logout">
    <SignOutApp/>
</Menu.Item>

*/}
