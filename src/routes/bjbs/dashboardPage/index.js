import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const DashboardPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/riskprofile`} component={asyncComponent(() => import('./RiskProfile'))}/>
        <Route path={`${match.url}/grafikuser`} component={asyncComponent(() => import('./GrafikUser'))}/>
        <Route path={`${match.url}/grafikperingkatkonsolidasi`} component={asyncComponent(() => import('./GrafikKonsolidasi'))}/>
    </Switch>
);

export default DashboardPage;