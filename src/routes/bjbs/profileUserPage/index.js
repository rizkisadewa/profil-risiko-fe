import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const ProfilUserPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/kotakmasuk`} component={asyncComponent(() => import('./KotakMasuk'))}/>
        <Route path={`${match.url}/ubahpassword`} component={asyncComponent(() => import('./UbahPassword'))}/>
        <Route path={`${match.url}/ubahpin`} component={asyncComponent(() => import('./UbahPin'))}/>
    </Switch>
);

export default ProfilUserPage;