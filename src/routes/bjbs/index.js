import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import DashboardPage from "./dashboardPage";
import RisikoInheren from "./risikoInheren";
import MasterDataPage from "./masterDataPage";
import KeperluanDataPage from "./keperluanDataPage";
import LaporanPage from "./laporanPage";
import ProfileUserPage from "./profileUserPage";
import LainLainPage from "./lainPage";
import KpmrPage from "./kpmrPage";
import DataInputPage from "./dataInputPage";
import LaporanLockedPage from "./laporanLockedPage";

import asyncComponent from "util/asyncComponent";

const Bjbs = ({match}) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/home`}/>
        <Route path={`${match.url}/home`} component={asyncComponent(() => import('./HomePage'))}/>
        <Route path={`${match.url}/dashboard`} component={DashboardPage}/>
        <Route path={`${match.url}/risikoinheren`} component={RisikoInheren}/>
        <Route path={`${match.url}/kpmr`} component={KpmrPage}/>
        <Route path={`${match.url}/datainput`} component={DataInputPage}/>
        <Route path={`${match.url}/masterdata`} component={MasterDataPage}/>
        <Route path={`${match.url}/keperluandata`} component={KeperluanDataPage}/>
        <Route path={`${match.url}/laporan`} component={LaporanPage}/>
        <Route path={`${match.url}/laporan-locked`} component={LaporanLockedPage}/>
        <Route path={`${match.url}/profileuser`} component={ProfileUserPage}/>
        <Route path={`${match.url}/lainlain`} component={LainLainPage}/>
    </Switch>
);

export default Bjbs;
