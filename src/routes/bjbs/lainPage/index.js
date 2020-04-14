import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const LaporanPage = ({match}) => (
    <switch>
        {/*<Route path={`${match.url}/logout`} component={asyncComponent(() => import('./Logout'))}/>*/}
    </switch>
);

export default LaporanPage;