import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import DashboardPage from "./dashboardPage";
import MasterDataPage from "./masterDataPage";

import asyncComponent from "util/asyncComponent";

const Bjbs = ({match}) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/home`}/>
        <Route path={`${match.url}/home`} component={asyncComponent(() => import('./HomePage'))}/>
        <Route path={`${match.url}/dashboard`} component={DashboardPage}/>
        <Route path={`${match.url}/masterdata`} component={MasterDataPage}/>
    </Switch>
);

export default Bjbs;
