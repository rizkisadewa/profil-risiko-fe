import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const RisikoInherenPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/jenisrisiko`} component={asyncComponent(() => import('../risikoInheren/JenisRisiko'))}/>
        <Route path={`${match.url}/parameterfaktor`} component={asyncComponent(() => import('../risikoInheren/ParameterFaktor'))}/>
        <Route path={`${match.url}/parametermanual`} component={asyncComponent(() => import('../risikoInheren/ParameterManual'))}/>
        <Route path={`${match.url}/parameterkuantitatif`} component={asyncComponent(() => import('../risikoInheren/ParameterKuantitatif'))}/>
        <Route path={`${match.url}/parameterkualitatif`} component={asyncComponent(() => import('../risikoInheren/ParameterKualitatif'))}/>
        <Route path={`${match.url}/parameterkualitatifdualalternatif`} component={asyncComponent(() => import('../risikoInheren/ParameterKualitatifDualAlternatif'))}/>
    </Switch>
);

export default RisikoInherenPage;
