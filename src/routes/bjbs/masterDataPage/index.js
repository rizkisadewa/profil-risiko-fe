import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const MasterDataPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/jenisrisiko`} component={asyncComponent(() => import('./JenisRisiko'))}/>
        <Route path={`${match.url}/jenispenilaian`} component={asyncComponent(() => import('./JenisPenilaian'))}/>
        <Route path={`${match.url}/jenisperingkatrisiko`} component={asyncComponent(() => import('./JenisPeringkatRisiko'))}/>
        <Route path={`${match.url}/parameter-faktor`} component={asyncComponent(() => import('./ParameterFaktor'))}/>
    </Switch>
);

export default MasterDataPage;