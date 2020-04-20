import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const LaporanPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/laporanprofilrisikokeojk`} component={asyncComponent(() => import('./LaporanProfilRisikoKeOjk'))}/>
        <Route path={`${match.url}/laporanpertriwulan`} component={asyncComponent(() => import('./LaporanPerTriwulan'))}/>
        <Route path={`${match.url}/laporanakhirtahun`} component={asyncComponent(() => import('./LaporanAkhirTahun'))}/>
    </Switch>
);

export default LaporanPage;