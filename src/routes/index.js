import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
        <Route path={`${match.url}#/home`} component={asyncComponent(() => import('./HomePage'))}/>
        <Route path={`${match.url}#/dashboard/riskprofile`} component={asyncComponent(() => import('./DashboardPage/RiskProfile'))}/>
        <Route path={`${match.url}#/dashboard/grafikuser`} component={asyncComponent(() => import('./DashboardPage/GrafikUser'))}/>
        <Route path={`${match.url}#/dashboard/grafikperingkatkonsolidasi`} component={asyncComponent(() => import('./DashboardPage/GrafikKonsolidasi'))}/>
        <Route path={`${match.url}#/masterdata/jenisrisiko`} component={asyncComponent(() => import('./MasterDataPage/JenisRisiko'))}/>
        <Route path={`${match.url}#/masterdata/jenispenilaian`} component={asyncComponent(() => import('./MasterDataPage/JenisPenilaian'))}/>
        <Route path={`${match.url}#/masterdata/jenisperingkatrisiko`} component={asyncComponent(() => import('./MasterDataPage/JenisPeringkatRisiko'))}/>
        <Route path={`${match.url}#/masterdata/faktor`} component={asyncComponent(() => import('./MasterDataPage/Faktor'))}/>
        <Route path={`${match.url}#/masterdata/parameter`} component={asyncComponent(() => import('./MasterDataPage/Parameter'))}/>
    </Switch>
  </div>
);

export default App;
