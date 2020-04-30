import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const ProfilRisikoPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/jenisrisiko`} component={asyncComponent(() => import('../profilRisiko/JenisRisiko'))}/>
        <Route path={`${match.url}/jenisperingkatrisiko`} component={asyncComponent(() => import('../profilRisiko/JenisPeringkatRisiko'))}/>
        <Route path={`${match.url}/parameter-faktor`} component={asyncComponent(() => import('../profilRisiko/ParameterFaktor'))}/>
        <Route path={`${match.url}/parametermanual`} component={asyncComponent(() => import('../profilRisiko/ParameterManual'))}/>
        <Route path={`${match.url}/parameterkuantitatif`} component={asyncComponent(() => import('../profilRisiko/ParameterKuantitatif'))}/>
        <Route path={`${match.url}/parameterkualitatif`} component={asyncComponent(() => import('../profilRisiko/ParameterKualitatif'))}/>
    </Switch>
);

export default ProfilRisikoPage;