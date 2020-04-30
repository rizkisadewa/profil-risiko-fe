import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const MasterDataPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/jenispenilaian`} component={asyncComponent(() => import('./JenisPenilaian'))}/>
    </Switch>
);

export default MasterDataPage;