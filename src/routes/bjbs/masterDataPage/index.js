import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const MasterDataPage = ({match}) => (
    <switch>
        <Route path={`${match.url}/jenisrisiko`} component={asyncComponent(() => import('./JenisRisiko'))}/>
        <Route path={`${match.url}/jenispenilaian`} component={asyncComponent(() => import('./JenisPenilaian'))}/>
        <Route path={`${match.url}/jenisperingkatrisiko`} component={asyncComponent(() => import('./JenisPeringkatRisiko'))}/>
        <Route path={`${match.url}/faktor`} component={asyncComponent(() => import('./Faktor'))}/>
        <Route path={`${match.url}/parameter`} component={asyncComponent(() => import('./Parameter'))}/>
    </switch>
);

export default MasterDataPage;